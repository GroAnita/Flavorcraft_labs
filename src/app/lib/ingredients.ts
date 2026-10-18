const quantityFormat = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
});

function isScalable(quantity: unknown): quantity is number {
  return typeof quantity === "number" && Number.isFinite(quantity) && quantity > 0;
}

// original quantity × selected servings ÷ original servings
export function scaleQuantity(
  quantity: number,
  originalServings: number,
  servings: number
): number {
  if (!isScalable(originalServings) || !isScalable(servings)) return quantity;
  return (quantity * servings) / originalServings;
}

// Returns the text to show for a quantity, or "" when there is none.
// Non-numeric amounts like "to taste" are returned as they are.
export function formatQuantity(
  quantity: unknown,
  originalServings: number,
  servings: number
): string {
  if (isScalable(quantity)) {
    return quantityFormat.format(
      scaleQuantity(quantity, originalServings, servings)
    );
  }
  if (typeof quantity === "string") return quantity.trim();
  return "";
}
