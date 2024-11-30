/**
 * Utility function to format a phone number as 555-555-5555
 * @param input - The input string to format
 * @returns The masked value
 */

export const formatPhoneNumber = (input: string): string => {
  // Remove any non-numeric characters
  const numbersOnly = input.replace(/\D/g, "");

  // Ensure the string has at most 10 characters
  const trimmed = numbersOnly.substring(0, 10);

  // Format the string as 555-555-5555
  const formatted = trimmed.replace(
    /(\d{3})(\d{3})(\d{0,4})/,
    (_, areaCode, prefix, lineNumber) => {
      if (lineNumber) {
        return `${areaCode}-${prefix}-${lineNumber}`;
      } else if (prefix) {
        return `${areaCode}-${prefix}`;
      } else {
        return areaCode;
      }
    },
  );

  return formatted;
};
