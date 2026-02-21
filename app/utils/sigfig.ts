// Count Significant Figures
export function countSignificantFigures(value: string): number {
  // Remove leading/trailing spaces
  value = value.trim();

  // If scientific notation
  if (value.includes("e") || value.includes("E")) {
    const [coefficient] = value.split(/[eE]/);
    return countSignificantFigures(coefficient);
  }

  // Remove leading zeros
  value = value.replace(/^0+/, "");

  // If decimal
  if (value.includes(".")) {
    value = value.replace(".", "");
    return value.length;
  }

  // Remove trailing zeros (if no decimal)
  value = value.replace(/0+$/, "");

  return value.length;
}