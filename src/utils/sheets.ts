import { ContactForm } from '../types';

const SHEET_ID = 'YOUR_SHEET_ID';
const SHEET_NAME = 'Form Responses';
const SCRIPT_URL = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`;

export const submitToGoogleSheets = async (formData: ContactForm & { totalSavings: number }) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    });

    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};