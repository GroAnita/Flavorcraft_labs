# Lighthouse Audit Report

## Audit information

- **Project:** FlavorCraft Labs
- **Date:** October 16, 2026
- **Page tested:** Home page (`/`), Login page (`/login`), Registration page (`/register`)
- **Environment:** Local Next.js production build
- **Device:** Mobile and Desktop
- **Tool:** Google Lighthouse (Chrome DevTools)

## Homepage Initial Baseline scores

| Category       | Mobile Score | Desktop Score |
| -------------- | ------------ | ------------- |
| Performance    | 46           | 99            |
| Accessibility  | 97           | 97            |
| Best Practices | 69           | 69            |
| SEO            | 100          | 100           |

### Homepage Mobile Audit Reliability

Three mobile Lighthouse audits were performed.

| Run         | Performance | Accessibility | Best Practices | SEO |
| ----------- | ----------: | ------------: | -------------: | --: |
| Initial     |          46 |            97 |             69 | 100 |
| Incognito 1 |          83 |            97 |             96 | 100 |
| Incognito 2 |          89 |            97 |             92 | 100 |

Both Incognito runs reported that the page exceeded
Lighthouse's loading time limit and that results
might be incomplete.

Performance and Best Practices scores varied
significantly between runs.

**Status:** Provisional baseline. Further investigation
is required before drawing conclusions about performance.

**Follow-up:** Repeat the audit under consistent conditions
once core functionality is complete. Investigate whether
third-party resources or network activity contribute to
the loading timeout.

### Initial Comparison

The homepage achieved a significantly higher Performance score
on Desktop (99) than Mobile (46).

Accessibility and SEO scores were consistently high across
both device configurations.

Best Practices scored 69 on both, indicating that further
investigation is needed.

Mobile performance is the main optimization concern,
particularly Total Blocking Time, Speed Index, and image delivery.

Performance improvements will be reviewed after core
application functionality is complete.

## Audit Scope and Limitations

This audit was conducted on the homepage using a local
Next.js production build.

The application is still under active development, and
some routes and features have not yet been completed.

The results provide an initial performance and technical
SEO baseline rather than a final assessment of the website.

Findings will be reviewed again once core functionality
is complete and the application is deployed.

## Performance

### Mobile Baseline Score: 46/100

| Metric                         | Result   | Assessment        |
| ------------------------------ | -------- | ----------------- |
| First Contentful Paint (FCP)   | 2.7 s    | Needs improvement |
| Largest Contentful Paint (LCP) | 3.8 s    | Needs improvement |
| Total Blocking Time (TBT)      | 2,430 ms | Poor              |
| Cumulative Layout Shift (CLS)  | 0        | Good              |
| Speed Index                    | 15.6 s   | Poor              |

### Initial Assessment

The most significant concerns are Total Blocking Time and
Speed Index, indicating substantial main-thread blocking
and slow visual loading under simulated mobile conditions.

LCP also requires investigation to identify whether the
homepage's hero image or another element is responsible.

No layout shifts were detected during the audit.

### Performance Insights

The initial mobile Lighthouse audit identified several
potential optimization opportunities.

| Finding                             | Estimated Savings | Status                                     |
| ----------------------------------- | ----------------- | ------------------------------------------ |
| Improve image delivery              | 1,932 KiB         | Findings documented; optimization deferred |
| Legacy JavaScript                   | 13 KiB            | Investigation pending                      |
| Font display                        | 50 ms             | Investigation pending                      |
| Render-blocking requests            | 20 ms             | Investigation pending                      |
| Forced reflow                       | Not specified     | Investigation pending                      |
| LCP breakdown and request discovery | Not specified     | Investigation pending                      |
| Network dependency tree             | Not specified     | Investigation pending                      |

#### Initial Recommendations

- Investigate image sizes, formats, and responsive image delivery.
- Review whether desktop and mobile hero images are both
  being unnecessarily preloaded.
- Identify the element responsible for LCP.
- Investigate JavaScript execution and forced reflows
  contributing to main-thread blocking.

**Note:** These are initial Lighthouse findings.
Root causes and actual performance improvements
have not yet been verified.

### Image Delivery

**Finding:** Lighthouse identified approximately 1,932 KiB
of potential image transfer savings on mobile.

The majority of the affected images are externally hosted
recipe images.

| Image Source          | Estimated Savings |
| --------------------- | ----------------: |
| postimg.cc            |         857.3 KiB |
| Unsplash              |         514.5 KiB |
| MatPrat               |         280.1 KiB |
| Food & Wine           |         154.7 KiB |
| H2Q Shop              |          90.4 KiB |
| Local category images |          34.8 KiB |

#### Observations

- Several recipe images are substantially larger than
  their displayed dimensions.
- Some images could benefit from modern formats or
  increased compression.
- Externally hosted recipe images account for most of
  the estimated savings.

#### Recommendations

- Review recipe card image rendering.
- Consider Next.js Image optimization with responsive
  image sizes.
- Serve smaller image variants where supported.
- Verify that external image sources are compatible
  with the chosen optimization approach.

**Technical impact:** High potential for reducing image transfer size.

**Implementation priority:** Deferred until core functionality
and recipe details are complete.

**Status:** Lighthouse finding documented.
Optimization not yet implemented.

**Follow-up:** Review with the recipe card developer (Thea) once
core functionality is complete. Repeat the mobile audit
after improvements.

### Status

Baseline recorded. Root causes have not yet been confirmed.

## Best Practices

### Mobile Baseline Score 69/100

The initial Lighthouse audit identified the following areas for further investigation:

- Third party cookies (3 detected)
- Browser console errors
- Chrome DevTools Issues panel warnings
- Low-resolution images
- Security recommendations involving CSP, HSTS, COOP, clickjacking protection, and Trusted Types.

### Status

The audit confirmed missing category routes and identified image preload warnings. Other findings require further investigation to determine whether they represent application defects or deployment-related configuration issues.

### Next Steps

- Inspect browser console errors
- Identify third party cookie sources
- Review image resolution warnings
- Coordinate security-header recommendations with the development team.
- Recheck applicable findings on the deployed website.

### Browser Console Findings

#### Missing Category Routes

**Finding:** Requests to six category routes return HTTP 404.

**Affected routes:**

- `/categories/breakfast`
- `/categories/lunch`
- `/categories/dinner`
- `/categories/snack`
- `/categories/dessert`
- `/categories/drink`

**Possible cause:** Category pages have not yet been implemented
or merged into the current branch.

**Recommendation:** Verify that category routes are implemented
before final deployment. Recheck once the category pages are available.

**Status:** Pending development verification.

#### Unused Image Preloads

**Finding:** Chrome reports that the desktop and mobile hero
images were preloaded but not used shortly after page load.

**Affected resources:**

- `Header-Image-Desktop.png`
- `Header-Image-Mobile.png`

**Potential impact:** Unnecessary preloading may increase
network activity and affect page performance.

**Recommendation:** Review responsive image rendering and
preloading behavior. Verify which images are actually downloaded.

**Status:** Investigation pending.

## Accessibility

### Baseline Scores

- Mobile: 97/100
- Desktop: 97/100

### Identified Issue: Insufficient Color Contrast

**Finding:** Lighthouse identified foreground and background
color combinations that do not meet minimum contrast requirements.

**Impact:** Text may be difficult to read for users with
visual impairments.

**Recommendation:** Identify the affected elements and adjust
their colors to meet WCAG contrast requirements.

**Status:** Confirmed Lighthouse finding. Fix pending.

**Implementation priority:** Address before final accessibility
testing and project submission, without interrupting current
core feature development.

**Follow-up:** Coordinate with the responsible developer and QA
once the recipe details page is complete. Rerun Lighthouse
and verify the affected elements.

#### Affected Elements

Lighthouse identified two recurring color combinations
that fail its contrast audit:

1. Small uppercase text (`text-basil-300`) within a
   section using `bg-salt-500`.
2. Recipe card descriptions (`text-oat-800`) displayed
   on white card backgrounds (`bg-white`).

The recipe card issue occurs repeatedly because the
same styling is used across multiple cards.

#### Recommendations

- Verify the actual contrast ratios of the affected colors.
- Adjust text colors to meet WCAG AA contrast requirements
  (at least 4.5:1 for normal text).
- Reuse accessible color tokens across shared components.
- Rerun Lighthouse after the styling changes.

**Status:** Confirmed accessibility finding; fix pending.

**Implementation priority:** Address before final QA and
submission, without delaying completion of core functionality.

**Follow-up:** Share findings with the relevant developers
once the recipe details page is complete.

## Additional Page Audits

### Registration Page (`/register`)

| Category       | Mobile | Desktop |
| -------------- | -----: | ------: |
| Performance    |     91 |     100 |
| Accessibility  |     96 |      96 |
| Best Practices |    100 |      96 |
| SEO            |    100 |     100 |

**Assessment:** All categories scored above 90 on both
devices. Accessibility findings should be reviewed
before final QA.

**Status:** Initial baseline completed.

### Login Page (`/login`)

| Category       | Mobile | Desktop |
| -------------- | -----: | ------: |
| Performance    |     93 |     100 |
| Accessibility  |     96 |      96 |
| Best Practices |    100 |      96 |
| SEO            |    100 |     100 |

**Assessment:** All four categories scored above 90 in the clean-session mobile audit and desktop audit.

**Testing note:** An earlier mobile run scored 63 and reported potentially interfering IndexedDB data. The Incognito retest scored 93. Performance results can vary between runs.

**Status:** Initial baseline completed. Remaining accessibility findings should be reviewed before final QA.

## Follow-up Performance Investigation — 21 October 2026

### Overview

Following the initial Lighthouse baseline audit on 16 October 2026, additional investigations were conducted to identify potential causes of slow mobile performance.

The investigation focused on server response time, render-blocking font resources, image delivery, and responsive hero image loading.

The findings were documented and communicated to the development team through GitHub tickets.

### 1. Slow Server Response

**Finding:** Lighthouse reported a document response time of approximately 797 ms, with an estimated improvement opportunity of 700 ms.

**Investigation:**

The homepage server component (`src/app/(pages)/page.tsx`) performs asynchronous operations to retrieve recipe data and authentication-related information.

The implementation currently awaits `fetchRecipes()` and `getAccessToken()` sequentially.

The recipe API request in `src/app/lib/recipe.ts` does not explicitly configure Next.js fetch caching.

These observations identify areas worth investigating, but do not independently establish the cause of the server response delay. API latency, authentication processing, and deployment infrastructure may also contribute.

**Recommendations:**

- Profile server-side operations to identify the main source of latency.
- Review whether independent asynchronous operations can execute concurrently.
- Evaluate appropriate caching strategies for publicly available recipe data.
- Compare response times before and after changes.

**GitHub ticket:** #229 — Fix Slow Server Response  
**Priority:** P1  
**Status:** Reported to development team; optimization not yet verified.

### 2. Render-Blocking Adobe Fonts

**Finding:** Lighthouse identified render-blocking font-related resources, including an Adobe Typekit stylesheet.

**Affected resources:**

- `use.typekit.net/xnz3twu.css`
- Resources loaded through `p.typekit.net`

**Investigation:**

The root layout (`src/app/layout.tsx`) loads an external Adobe Fonts stylesheet.

The application also uses Next.js font loading for Inter.

The external stylesheet introduces an additional dependency during initial page rendering.

Lighthouse reported approximately 770 ms associated with the identified stylesheet request and an estimated render-blocking improvement opportunity of approximately 930 ms.

These figures are diagnostic estimates rather than confirmed savings.

**Recommendations:**

- Review whether all externally loaded font families and weights are necessary.
- Investigate whether the stylesheet can be loaded in a less render-blocking manner.
- Evaluate suitable font-loading alternatives while preserving the approved visual design.
- Rerun Lighthouse after any changes.

**GitHub ticket:** #232 — Fix Adobe Fonts  
**Status:** Reported to development team; optimization not yet verified.

### 3. External Recipe Image Optimization

**Finding:** Lighthouse identified substantial potential transfer savings from oversized recipe images.

A subsequent audit reported approximately 2,308 KiB of potential image savings.

**Investigation:**

Many recipe images are hosted externally and supplied through the recipe API.

The shared `RecipeImage.tsx` component already uses Next.js `<Image>`, including the `fill` property.

However, the component uses `unoptimized`, meaning Next.js does not automatically resize or compress these images through its image optimization pipeline.

Therefore, simply replacing standard HTML images with Next.js `<Image>` would not resolve the underlying issue.

**Recommendations:**

- Investigate whether supported external image hosts can provide appropriately sized images.
- Evaluate a controlled image optimization or proxy strategy.
- Consider responsive image delivery and suitable image formats.
- Preserve fallback handling for missing or broken recipe images.
- Assess implementation complexity against the remaining project timeframe.

**Status:** Finding documented; optimization deferred.

**Limitation:** No verified reduction in image transfer size has been recorded.

### 4. Responsive Hero Image Loading

**Finding:** Both desktop and mobile homepage hero images were downloaded during mobile testing.

**Affected resources:**

- `Header-Image-Mobile.png`
- `Header-Image-Desktop.png`

**Investigation:**

Chrome DevTools Network inspection confirmed requests for both images on a mobile viewport.

The observed transfer sizes were approximately:

- Mobile hero image: 9.5 KB
- Desktop hero image: 21.0 KB

Although the transferred files are relatively small, downloading both images introduces unnecessary network activity.

The investigation also identified hero image preload behavior as a potential optimization opportunity.

Lighthouse's LCP request discovery diagnostics indicated that the mobile hero image was not being prioritized as expected.

**Recommendations:**

- Review responsive hero image rendering and preload configuration.
- Ensure the browser prioritizes the image appropriate to the current viewport.
- Avoid unnecessary downloads of images intended for other viewport sizes.
- Recheck Largest Contentful Paint and network requests after changes.

**Status:** Duplicate mobile downloads confirmed; optimization not yet verified.

### 5. Development Follow-up

The following tickets were created to communicate relevant issues to the development team:

| Ticket | Description              | Category           |
| ------ | ------------------------ | ------------------ |
| #229   | Fix Slow Server Response | Performance        |
| #232   | Fix Adobe Fonts          | Performance        |
| #228   | Fix Sticky Navbar        | Usability / UI     |
| #243   | Fix Favorites            | Functionality / UX |

The server response and font-loading tickets address performance findings investigated during the Lighthouse follow-up.

The sticky navbar and Favorites tickets address separate usability and functionality concerns.

### 6. Overall Assessment

The follow-up investigation identified several opportunities to improve mobile performance.

The most significant areas for further technical review are:

- Server-side response time and data fetching.
- Render-blocking external font resources.
- Oversized externally hosted recipe images.
- Responsive hero image loading and prioritization.

These findings have been documented, and relevant issues have been communicated to the development team.

**Status:** Investigation and reporting completed. Performance improvements remain subject to developer implementation and subsequent verification.

### 7. Recommended Final Verification

Before submission, where time and development progress permit:

1. Repeat the mobile Lighthouse audit on the latest deployed version.
2. Record the Performance, Accessibility, Best Practices, and SEO scores.
3. Compare the results with the original baseline, noting differences in test environment and reliability.
4. Check whether completed developer fixes address the reported findings.
5. Document unresolved issues as known limitations rather than marking them as resolved.

**Note:** Lighthouse scores can vary between runs and environments. Changes in scores should not automatically be attributed to individual code changes without further investigation.
