import React, { useState } from "react";
import { Calculator as CalculatorIcon, Info, X } from "lucide-react";
import { submitToGoogleSheets } from "../utils/sheets";

interface CalculatorInputs {
 deliveriesPerYear: number;
 denialRate: number;
 claimAmount: number;
 csectionCount: number;
 inductionCount: number;
 csectionlagTimes: number;
 inductionlagTimes: number;
 nurseSalary: number;
 nurseCount: number;
 adminCount: number;
 adminSalary: number;
 providerCount: number;
 providerSalary: number;
 lagTimes:number
}

interface CalculationResults {
 denialSavings: number;
 roomUtilizationSavings: number;
 roomUtilizationSavingsMultiplied: number;
 nurseTimeSavingsShift: number;
 adminTimeSavings: number;
 providerTimeSavings: number;
 totalSavings: number;
}

interface ContactForm {
 name: string;
 email: string;
 phone: string;
 hospitalName: string;
 location: string;
 specification: string;
}

const Calculator = () => {
 const [inputs, setInputs] = useState<CalculatorInputs>({
 deliveriesPerYear: 1000,
 denialRate: 15,
 claimAmount: 10000,
 lagTimes: 4,
 csectionCount: 250,
 inductionCount: 350,
 csectionlagTimes: 3.5,
 inductionlagTimes: 3.0,
 nurseSalary: 400,
 adminCount: 5,
 nurseCount: 5,
 adminSalary: 300,
 providerCount: 10,
 providerSalary: 800,
 });

 const [results, setResults] = useState<CalculationResults | null>(null);
 const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
 const [showContactForm, setShowContactForm] = useState(false);
 const [contactForm, setContactForm] = useState<ContactForm>({
 name: "",
 email: "",
 phone: "",
 hospitalName: "",
 location: "",
 specification: "",
 });
 const [submitted, setSubmitted] = useState(false);
 const resultsRef = React.useRef<HTMLDivElement>(null);

 const tooltips = {
 deliveriesPerYear:
 "Average number of deliveries your L&D performs annually, including vaginal deliveries and Cesarean sections.",
 denialRate: "Current percentage of L&D claims denied on first-pass.",
 claimAmount: "Average amount billed per delivery.",
 lagTimes: "Average delay between admission and procedure start.",
 csectionCount: "Average number of scheduled C-Sections per year.",
 inductionCount: "Average number of scheduled inductions per year.",
 csectionlagTimes:
 "Average time in hours from room placement of a placement to start of a scheduled C-section.",
 inductionlagTimes:
 "Average time in hours from room placement of a patient to start of a scheduled induction of labor.",
 nurseSalary: "Average compensation per 12-hour shift",
 adminCount:
 "Number of administrative staff per 12-hour shift including Unit Secretary, Unit Coordinator, Nurse Manager, Clinical Nurse Manager, Charge Nurse, Director of Women’s Services, Director of Maternal-Child Health, Perinatal Services Manager, Patient Care Coordinator, OB Hospitalist Program Director, Clinical Coordinator, Labor and Delivery Educator, Nurse Educator, Health Unit Clerk and Scheduler.",
 nurseCount:
 "Number of number of nurses scheduled on L&D per 12-hour shift.",
 adminSalary: "Average daily salary for administrative staff",
 providerCount:
 "Number of providers (hospitalists, private physicians, midwives, physician assistants) on L&D per 12-hour shift",
 providerSalary: "Average daily salary for providers",
 };

 const suggestions = {
 deliveriesPerYear: "Typical: 500-10000",
 denialRate: "Avg: 5-35%",
 claimAmount: "Avg: $3-25k",
 lagTimes: "Avg: 2-6 hours",
 csectionCount: "Typical: 50-3000",
 inductionCount: "Typical: 50-5000",
 csectionlagTimes: "Avg: 2-6 hours",
 inductionlagTimes: "Avg: 1.5-6 hours",
 nurseSalary: "Avg: $350-600",
 adminCount: "Avg: 2-20",
 nurseCount: "Avg: 2-35",
 adminSalary: "Avg: $200-400",
 providerCount: "Avg: 2-20",
 providerSalary: "Avg: $600-1.2k",
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const { name, value } = e.target;
 setInputs((prev) => ({
 ...prev,
 [name]: parseFloat(value) || 0,
 }));
 };

 const calculateSavings = () => {
 const denialSavings =
 inputs.deliveriesPerYear *
 inputs.claimAmount *
 (inputs.denialRate / 100) *
 0.94;
 const roomUtilizationSavings =
 inputs.csectionCount * inputs.csectionlagTimes +
 inputs.inductionlagTimes * inputs.inductionCount;
 const roomUtilizationSavingsMultiplied = roomUtilizationSavings * 0.45;
 const nurseTimeSavingsShift = 3 * inputs.nurseCount;
 const adminTimeSavings = 2 * inputs.adminCount;
 const providerTimeSavings = 2.5 * inputs.providerCount;
 const totalSavings =
 denialSavings +
 roomUtilizationSavings +
 nurseTimeSavingsShift +
 adminTimeSavings +
 providerTimeSavings;

 setResults({
 denialSavings,
 roomUtilizationSavings,
 roomUtilizationSavingsMultiplied,
 nurseTimeSavingsShift,
 adminTimeSavings,
 providerTimeSavings,
 totalSavings,
 });

 setTimeout(() => {
 if (resultsRef.current && window.innerWidth < 1024) {
 resultsRef.current.scrollIntoView({
 behavior: "smooth",
 block: "start",
 });
 }
 }, 100);
 };

 const handleContactFormChange = (
 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
 const { name, value } = e.target;
 setContactForm((prev) => ({
 ...prev,
 [name]: value,
 }));
 };

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 setTimeout(() => {
 setShowContactForm(false);
 setSubmitted(false);
 setContactForm({
 name: "",
 email: "",
 phone: "",
 hospitalName: "",
 location: "",
 specification: "",
 });
 }, 3000);
 };

 const inputGroups = [
 {
 title: "Hospital Overview",
 inputs: [
 {
 key: "deliveriesPerYear",
 label: "Annual Deliveries",
 },
 {
 key: "denialRate",
 label: "Denial Rate",
 },
 {
 key: "claimAmount",
 label: "Average Claim Amount",
 },
 ],
 },
 {
 title: "Lag Times Overview",
 inputs: [
 {
 key: "csectionCount",
 label: "Annual Number of Scheduled C-Sections",
 },
 {
 key: "csectionlagTimes",
 label:
 "Average Admission to Scheduled C-Section Start Lag Time in Hours",
 },
 {
 key: "inductionCount",
 label: "Annual Number of Scheduled Inductions",
 },
 {
 key: "inductionlagTimes",
 label:
 "Average Admission to Scheduled Induction Start Lag Time in Hours",
 },
 ],
 },
 {
 title: "Typical Weekday Staff Information",
 inputs: [
 {
 key: "nurseCount",
 label: "Average Nurse Count per Shift",
 },
 {
 key: "adminCount",
 label: "Average Administrative Staff Count per Shift",
 },
 {
 key: "providerCount",
 label: "Average Provider Count per Shift",
 },
 ],
 },
 ];

 return (
 <div className="min-h-screen bg-[#F4FBFC] px-4 py-8 font-montserrat overflow-x-hidden">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-8 md:mb-12">
 <img
 src="https://images.squarespace-cdn.com/content/v1/623b4a3080d2463645e1be23/1f8629de-916e-49b0-b9ea-41d2ece7911d/Original+on+Transparent.png?format=1500w"
 alt="BirthModel"
 className="h-12 md:h-16 mx-auto mb-6 md:mb-8"
 />
 <h1 className="text-3xl md:text-5xl text-birthmodel-teal tracking-tight">
 ROI Calculator
 </h1>
 <p className="text-base md:text-lg text-birthmodel-gray mt-3">
 Calculate your potential savings with our AI-driven platform
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
 <div className="space-y-6 md:space-y-8">
 {inputGroups.map((group) => (
 <div
 key={group.title}
 className="bg-white p-4 md:p-8 rounded-2xl shadow-lg"
 >
 <h3 className="text-lg md:text-xl text-birthmodel-teal mb-4 md:mb-6">
 {group.title}
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
 {group.inputs.map(({ key, label }) => (
 <div key={key} className="relative">
 <div className="flex items-center justify-between mb-2">
 <label className="text-sm text-birthmodel-gray">
 {label}
 </label>
 <button
 className="text-birthmodel-teal hover:text-birthmodel-blue-dark transition-colors"
 onMouseEnter={() => setActiveTooltip(key)}
 onMouseLeave={() => setActiveTooltip(null)}
 >
 <Info className="h-4 w-4" />
 </button>
 </div>
 {activeTooltip === key && (
 <div className="absolute z-10 right-0 mt-1 w-64 px-4 py-2 bg-birthmodel-teal text-white text-sm rounded-lg shadow-lg">
 {tooltips[key as keyof typeof tooltips]}
 </div>
 )}
 <div className="space-y-2">
 <div className="flex items-center space-x-2">
 <div className="relative flex-1">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-birthmodel-gray">
 {key.includes("Salary") || key === "claimAmount"
 ? "$"
 : ""}
 </span>
 <input
 type="number"
 name={key}
 value={inputs[key as keyof CalculatorInputs]}
 onChange={handleInputChange}
 className={`w-full px-3 py-2 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors ${
 key.includes("Salary") || key === "claimAmount"
 ? "pl-7"
 : ""
 }`}
 />
 </div>
 <span className="text-xs text-birthmodel-gray whitespace-nowrap">
 {suggestions[key as keyof typeof suggestions]}
 </span>
 </div>
 <input
 type="range"
 name={key}
 value={inputs[key as keyof CalculatorInputs]}
 onChange={handleInputChange}
 className="w-full h-2 bg-birthmodel-blue-light rounded-lg appearance-none cursor-pointer accent-birthmodel-teal"
 min={0}
 max={
 key === "deliveriesPerYear"
 ? 10000
 : key === "denialRate"
 ? 100
 : key === "claimAmount"
 ? 20000
 : key === "lagTimes"
 ? 24
 : key === "nurseSalary"
 ? 1000
 : key === "adminCount"
 ? 50
 : key === "nurseCount"
 ? 50
 : key === "adminSalary"
 ? 1000
 : key === "providerCount"
 ? 50
 : key === "providerSalary"
 ? 2000
 : 100
 }
 step={
 key === "denialRate"
 ? 0.1
 : key === "lagTimes"
 ? 0.5
 : 1
 }
 />
 </div>
 </div>
 ))}
 </div>
 </div>
 ))}
 <button
 onClick={calculateSavings}
 // disabled={results !== null}
 className={`w-full px-6 py-4 rounded-xl flex items-center justify-center text-lg shadow-lg transition-all duration-200 ${
 "bg-birthmodel-teal text-white hover:bg-opacity-90"
 } sticky bottom-4 lg:relative lg:bottom-0 z-10`}
 >
 <CalculatorIcon className="w-6 h-6 mr-2" />
 {results ? "Recalculate" : "Calculate Savings"}
 </button>
 </div>

 {results ? (
 <div
 ref={resultsRef}
 className="bg-white p-4 md:p-8 rounded-2xl shadow-lg lg:sticky lg:top-4"
 >
 <h2 className="text-2xl font-semibold text-birthmodel-teal mb-8">
 Annual Savings Projection
 </h2>
 <div className="space-y-6">
 <div className="bg-birthmodel-blue-light/30 border-l-4 border-birthmodel-teal p-6 rounded-xl">
 <h3 className="text-lg font-medium text-birthmodel-teal mb-2">
 Reduced First-Pass Claim Denials
 </h3>
 <div className="flex items-baseline">
 <p className="text-3xl font-bold text-birthmodel-teal">
 ${results.denialSavings.toLocaleString()}
 </p>
 <span className="ml-2 text-sm text-birthmodel-gray">
 per year
 </span>
 </div>
 <p className="text-sm text-birthmodel-gray mt-2">
 Based on a 94% reduction in first-pass denials
 </p>
 </div>

 <div className="bg-birthmodel-blue-light/30 border-l-4 border-birthmodel-teal p-6 rounded-xl">
 <h3 className="text-lg font-medium text-birthmodel-teal mb-2">
 Room and Patient Time Optimization
 </h3>
 <div className="flex items-baseline">
 <p className="text-3xl font-bold text-birthmodel-teal">
 {results.roomUtilizationSavingsMultiplied.toLocaleString()}
 </p>
 <span className="ml-2 text-sm text-birthmodel-gray">
 hours per year saved with Birth Model
 </span>
 </div>
 <p className="text-sm text-birthmodel-gray mt-2">
 Based on 45% improvement in efficiency from the current{" "}
 {results.roomUtilizationSavings.toLocaleString()} hours per
 year underutilized
 </p>
 </div>

 <div className="bg-birthmodel-blue-light/30 border-l-4 border-birthmodel-teal p-6 rounded-xl">
 <h3 className="text-lg font-medium text-birthmodel-teal mb-4">
 Increased Patient Contact Time Results in Improved HCAHPS
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white p-4 rounded-lg">
 <p className="text-sm font-medium text-birthmodel-gray mb-1">
 Nurses
 </p>
 <p className="text-xl font-bold text-birthmodel-teal" style={{display:"inline"}}>
 {results.nurseTimeSavingsShift.toLocaleString()}
 </p>
 <span className="ml-2 text-xs text-birthmodel-gray italic">
 hrs/shift
 </span>
 <br/>
 <p className="text-xl font-bold text-birthmodel-teal" style={{display:"inline"}}>
 {results.nurseTimeSavingsShift.toLocaleString()}
 </p>
 <span className="ml-2 text-xs text-birthmodel-gray italic">
 hrs/week
 </span>
 <br/>
 <p className="text-xl font-bold text-birthmodel-teal " style={{display:"inline"}}>
 {results.nurseTimeSavingsShift.toLocaleString()}
 </p>
 <span className="ml-2 text-xs text-birthmodel-gray italic">
 hrs/years
 </span>
 <p className="text-xs font-medium text-birthmodel-gray mb-1 mt-2 italic">
 based on 3hrs/shift saved per nurse
 </p>
 </div>
 <div className="bg-white p-4 rounded-lg">
 <p className="text-sm font-medium text-birthmodel-gray mb-1" style={{display:"inline"}}>
 Administrators
 </p>
 <p className="text-xl font-bold text-birthmodel-teal">
 {results.adminTimeSavings.toLocaleString()}
 </p>
 <p className="text-xs text-birthmodel-gray mt-1">
 2 hrs/shift saved per administrator
 </p>
 </div>
 <div className="bg-white p-4 rounded-lg">
 <p className="text-sm font-medium text-birthmodel-gray mb-1" style={{display:"inline"}}>
 Providers
 </p>
 <p className="text-xl font-bold text-birthmodel-teal">
 {results.providerTimeSavings.toLocaleString()}
 </p>
 <p className="text-xs text-birthmodel-gray mt-1">
 2.5 hrs/shift saved per provider
 </p>
 </div>
 </div>
 </div>



 <div className="relative">
 <div className="absolute inset-0 bg-gradient-to-r from-birthmodel-teal via-birthmodel-blue to-birthmodel-teal rounded-xl animate-gradient-x"></div>
 <button
 onClick={() => setShowContactForm(true)}
 className="relative flex items-center justify-center w-full px-8 py-5 bg-birthmodel-teal rounded-xl transition-all duration-200 hover:bg-opacity-90 group"
 >
 <div className="absolute inset-0 bg-gradient-to-r from-birthmodel-blue/20 via-transparent to-birthmodel-blue/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 <div className="relative flex items-center space-x-4">
 <span className="text-lg font-bold text-white">
 Request Detailed Analysis
 </span>
 <svg
 className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-200"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 d="M13 7l5 5m0 0l-5 5m5-5H6"
 />
 </svg>
 </div>
 </button>
 </div>
 </div>
 </div>
 ) : (
 <div className="hidden lg:block bg-white p-8 rounded-2xl shadow-lg sticky top-4">
 <div className="text-center text-birthmodel-gray">
 <CalculatorIcon className="w-16 h-16 mx-auto mb-4 text-birthmodel-blue" />
 <p className="text-lg">
 Enter your facility's information to calculate potential
 savings
 </p>
 </div>
 </div>
 )}
 </div>

 {showContactForm && (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
 <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
 {!submitted ? (
 <form onSubmit={handleSubmit} className="p-4 md:p-8">
 <div className="flex justify-between items-center mb-8">
 <h3 className="text-2xl font-bold text-birthmodel-teal">
 Request Detailed Analysis
 </h3>
 <button
 type="button"
 onClick={() => setShowContactForm(false)}
 className="text-birthmodel-gray hover:text-birthmodel-teal transition-colors"
 >
 <X className="w-6 h-6" />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
 <div>
 <label className="block text-sm font-medium text-birthmodel-gray mb-2">
 Full Name *
 </label>
 <input
 type="text"
 name="name"
 required
 value={contactForm.name}
 onChange={handleContactFormChange}
 className="w-full px-4 py-3 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors"
 placeholder="John Doe"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-birthmodel-gray mb-2">
 Email *
 </label>
 <input
 type="email"
 name="email"
 required
 value={contactForm.email}
 onChange={handleContactFormChange}
 className="w-full px-4 py-3 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors"
 placeholder="john@example.com"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-birthmodel-gray mb-2">
 Phone Number *
 </label>
 <input
 type="tel"
 name="phone"
 required
 value={contactForm.phone}
 onChange={handleContactFormChange}
 className="w-full px-4 py-3 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors"
 placeholder="(555) 123-4567"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-birthmodel-gray mb-2">
 Hospital Name *
 </label>
 <input
 type="text"
 name="hospitalName"
 required
 value={contactForm.hospitalName}
 onChange={handleContactFormChange}
 className="w-full px-4 py-3 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors"
 placeholder="City General Hospital"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-birthmodel-gray mb-2">
 Location *
 </label>
 <input
 type="text"
 name="location"
 required
 value={contactForm.location}
 onChange={handleContactFormChange}
 className="w-full px-4 py-3 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors"
 placeholder="New York, NY"
 />
 </div>
 <div className="md:col-span-2">
 <label className="block text-sm font-medium text-birthmodel-gray mb-2">
 Additional Specifications
 </label>
 <textarea
 name="specification"
 value={contactForm.specification}
 onChange={handleContactFormChange}
 className="w-full px-4 py-3 border-2 border-birthmodel-blue-light rounded-lg focus:border-birthmodel-teal focus:ring-0 transition-colors"
 rows={4}
 placeholder="Any specific requirements or questions..."
 />
 </div>
 </div>

 <div className="flex flex-col-reverse sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
 <button
 type="button"
 onClick={() => setShowContactForm(false)}
 className="w-full sm:w-auto px-6 py-3 text-birthmodel-teal border-2 border-birthmodel-teal rounded-lg hover:bg-birthmodel-blue-light/20 transition-colors"
 >
 Cancel
 </button>
 <button
 onClick={() => submitToGoogleSheets(contactForm,results)}
 type="submit"
 className="w-full sm:w-auto px-6 py-3 bg-birthmodel-teal text-white rounded-lg hover:bg-opacity-90 transition-colors"
 >
 Submit Request
 </button>
 </div>
 </form>
 ) : (
 <div className="p-8 text-center">
 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
 <svg
 className="w-8 h-8 text-green-500"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 d="M5 13l4 4L19 7"
 />
 </svg>
 </div>
 <h3 className="text-2xl font-bold text-birthmodel-teal mb-2">
 Thank You!
 </h3>
 <p className="text-birthmodel-gray">
 Our team will get back to you shortly to discuss your
 potential savings of $
 {results.totalSavings.toLocaleString()} per year.
 </p>
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 </div>
 );
};

export default Calculator;
