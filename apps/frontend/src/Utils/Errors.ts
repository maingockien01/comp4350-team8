import {toast} from 'react-toastify';

/**
 * Displays an error message to the user.
 * @param {string} message The message to display to the user.
 */
export function displayError(message: string): void {
  toast.error(message);
}
