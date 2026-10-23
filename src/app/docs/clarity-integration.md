# Microsoft Clarity Integration

## Overview

Microsoft Clarity is integrated into FlavorCraft Labs to support UX evaluation through behavioral analytics, session recordings, and heatmaps.

The integration is consent-based to ensure analytics tracking only begins after visitors accept analytics cookies.

## Implementation

The application uses the official `@microsoft/clarity` package.

The integration consists of two main components:

- `AnalyticsManager.tsx` — Manages consent preferences and withdrawal.
- `ClarityTracker.tsx` — Initializes Microsoft Clarity after consent is accepted.

The Clarity project ID is provided through the environment variable `NEXT_PUBLIC_CLARITY_PROJECT_ID`.

If the project ID is missing, Clarity initialization is skipped and a warning is logged.

### Consent handling

Consent preferences are stored in `localStorage` using the key `flavorcraft_analytics_consent`.

On initial page load, `AnalyticsManager` restores the saved preference. Clarity is initialized only when consent is `"accepted"`.

The Clarity integration uses `Clarity.consentV2()` with the following configuration:

```ts
Clarity.consentV2({
  ad_Storage: "denied",
  analytics_Storage: "granted",
});
```

When visitors reject analytics consent, Clarity does not initialize.

When visitors withdraw previously accepted consent:

1. The preference is updated to `"rejected"`.
2. The application attempts to delete the `_clck` and `_clsk` cookies.
3. The page reloads.
4. The rejected preference is restored from `localStorage`, preventing Clarity from initializing again.

Consent withdrawal does not explicitly revoke consent through the Clarity API. Cookie removal is best-effort and depends on cookie scope.

## Privacy and access

Session recordings were reviewed to verify that sensitive form input values are masked.

Microsoft Clarity's IP blocking feature can be used to exclude internal testing traffic from analytics reports.

Relevant team members have been invited to the Clarity project to support analytics review and UX evaluation.

## Testing and verification

The integration was tested on the deployed FlavorCraft Labs application.

| Test                               | Result                                               |
| ---------------------------------- | ---------------------------------------------------- |
| No analytics consent               | No Clarity tracking requests observed                |
| Analytics consent accepted         | Clarity initialized and collection requests observed |
| Analytics consent rejected         | Tracking did not start                               |
| Consent withdrawn after acceptance | No further collection requests observed              |
| Navigation and interactions        | Visible in session recordings                        |
| Sensitive form inputs              | Masked in inspected recordings                       |
| Session recordings                 | Available; recent test session replayed correctly    |
| Click heatmaps                     | Interaction data available                           |

Testing was performed using browser DevTools, Microsoft Clarity recordings, and heatmaps.

## Known limitations

### Heatmap rendering

Some Microsoft Clarity heatmaps display pages without their expected CSS styling.

Investigation confirmed that Clarity attempted to retrieve a Next.js stylesheet from the Netlify development deployment, but the request returned `404 Not Found`.

The deployed website was checked separately, and its visible CSS requests returned `200 OK`.

The issue appears to affect Clarity's page reconstruction rather than the live website. Heatmap interaction data remains available, but missing styling limits the visual accuracy of the heatmaps.

The underlying cause of the missing stylesheet has not been conclusively established.

### Consent withdrawal

The application uses cookie clearing and a page reload to stop tracking after consent withdrawal. It does not explicitly invoke a Clarity API method to revoke consent.

The behavior was verified through Network testing, but cookie deletion cannot be guaranteed across all cookie scopes.

### Internal testing traffic

Internal team sessions may affect analytics results unless excluded using Clarity's IP blocking settings.
