// Shared styles for the compact form fields in the recipe form (38px high, as in Figma)

export const FIELD_LABEL_SM = "text-sm leading-none text-truffle-500";

const FIELD_BASE_SM =
  "w-full rounded-lg border border-transparent bg-salt-100 text-sm text-truffle-500 inset-shadow-[3px_3px_6px_rgb(0_0_0/0.05)] placeholder:text-oat-700 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error-text";

// Fixed height, since browsers add their own line height to inputs and selects
export const FIELD_INPUT_SM = `${FIELD_BASE_SM} h-[38px] px-3 leading-none`;

// 72px high, as in Figma. It can still be made taller
export const FIELD_TEXTAREA_SM = `${FIELD_BASE_SM} min-h-18 resize-y p-3 leading-5`;

export const FIELD_HELPER_SM = "text-xs leading-4 font-medium text-oat-800";
