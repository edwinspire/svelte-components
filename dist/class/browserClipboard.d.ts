/**
 * Copies the provided text to the user's system clipboard using modern `navigator.clipboard`
 * API when available, and a fallback `document.execCommand('copy')` if it is not.
 * Useful for copying links, codes, or IDs.
 *
 * @param {string} text - The text content to be copied to the clipboard.
 * @returns {Promise<{result: boolean, error: Error|undefined}>} A Promise that resolves to an object containing:
 *   - `result`: Boolean indicating if the copy was successful.
 *   - `error`: The error object if the copy failed, otherwise `undefined`.
 */
export function copyTextToClipboard(text: string): Promise<{
    result: boolean;
    error: Error | undefined;
}>;
