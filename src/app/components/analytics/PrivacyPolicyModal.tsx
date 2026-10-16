"use client";

import * as Dialog from "@radix-ui/react-dialog";

type PrivacyPolicyModalProps = {
  onClose: () => void;
};

export default function PrivacyPolicyModal({
  onClose,
}: PrivacyPolicyModalProps) {
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-surface p-6 text-foreground shadow-xl">
          <Dialog.Title className="text-xl font-semibold">
            Privacy Policy
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Information about FlavorCraft Labs, Microsoft Clarity analytics,
            cookies, consent, and your privacy choices.
          </Dialog.Description>

          <div className="mt-4 space-y-3 text-sm leading-relaxed [&_h3]:pt-3 [&_h3]:text-base [&_h3]:font-semibold [&_a]:underline [&_a]:underline-offset-2">
            <p>
              <strong>Last updated:</strong> October 2026
            </p>

            <h3>1. About FlavorCraft Labs</h3>
            <p>
              FlavorCraft Labs is a recipe discovery website developed as a
              school demonstration project. This notice explains how we use
              analytics and how visitors can manage their privacy preferences.
            </p>

            <h3>2. Microsoft Clarity Analytics</h3>

            <p>
              We use Microsoft Clarity to understand how visitors interact with
              our website and improve its usability. With your consent, Clarity
              may collect information such as page visits, clicks, scrolling
              activity, browser and device information, and interaction
              recordings. Microsoft processes analytics data on our behalf. For
              more information, see the{" "}
              <a
                href="https://privacy.microsoft.com/en-us/privacystatement"
                className="underline"
              >
                Microsoft Privacy Statement
              </a>
              .
            </p>

            <h3>3. Cookies and Consent</h3>
            <p>
              Analytics is optional and is disabled until you explicitly accept
              it. If you accept, Microsoft Clarity may use cookies, including
              _clck and _clsk, to understand website usage. We also use local
              storage to remember your analytics consent preference.
            </p>

            <h3>4. Your Privacy Choices</h3>
            <p>
              You can accept or reject analytics and change your preference at
              any time using Privacy Settings. If you withdraw consent, we stop
              further analytics tracking and clear the identified Clarity
              cookies. Withdrawing consent does not automatically delete
              information collected before your withdrawal. If you have
              questions about your data, please contact us using the details
              below.
            </p>

            <h3>5. Contact</h3>
            <p>
              If you have questions about analytics or privacy, please contact:
              <br />
              <a href="mailto:tongje04878@stud.noroff.no">
                tongje04878@stud.noroff.no
              </a>
              <br />
              Tone Gjerde, SEO & Analytics Lead
            </p>
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-basil-700"
            >
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
