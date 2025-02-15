export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  hospitalName: string;
  location: string;
  specification: string;
}

export interface CalculationResults {
  denialSavings: number;
  roomUtilizationSavings: number;
  roomUtilizationSavingsMultiplied: number;
  nurseTimeSavingsShift: number;
  adminTimeSavings: number;
  providerTimeSavings: number;
  totalSavings: number;
 }
