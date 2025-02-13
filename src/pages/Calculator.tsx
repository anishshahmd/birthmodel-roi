import React, { useState } from "react";
import { Calculator as CalculatorIcon, Info, X } from "lucide-react";

interface CalculatorInputs {
  deliveriesPerYear: number;
  denialRate: number;
  claimAmount: number;
  lagTimes: number;
  nurseSalary: number;
  nurseCount: number;
  adminCount: number;
  adminSalary: number;
  providerCount: number;
  providerSalary: number;
}

interface CalculationResults {
  denialSavings: number;
  roomUtilizationSavings: number;
  nurseTimeSavings: number;
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
    claimAmount: 5000,
    lagTimes: 4,
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
      "Average number of deliveries your facility handles annually",
    denialRate: "Current percentage of claims denied on first submission",
    claimAmount: "Average amount billed per delivery",
    lagTimes: "Average delay between room assignment and procedure start",
    nurseSalary: "Average compensation per 12-hour shift",
    adminCount: "Number of administrative staff involved in L&D",
    nurseCount: "Number of nurses involved in L&D",
    adminSalary: "Average daily salary for administrative staff",
    providerCount: "Number of providers (physicians, midwives) in L&D",
    providerSalary: "Average daily salary for providers",
  };

  const suggestions = {
    deliveriesPerYear: "Typical: 500-5000",
    denialRate: "Avg: 15-25%",
    claimAmount: "Avg: $3-15k",
    lagTimes: "Avg: 2-6 hrs",
    nurseSalary: "Avg: $350-600",
    adminCount: "Avg: 3-15",
    nurseCount: "Avg: 2-35",
    adminSalary: "Avg: $200-400",
    providerCount: "Avg: 5-20",
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
      inputs.deliveriesPerYear * inputs.claimAmount * 0.15;
    const nurseTimeSavings = 3 * inputs.nurseSalary * 365;
    const adminTimeSavings = 4 * inputs.adminSalary * inputs.adminCount * 365;
    const providerTimeSavings =
      5 * inputs.providerSalary * inputs.providerCount * 365;
    const totalSavings =
      denialSavings +
      roomUtilizationSavings +
      nurseTimeSavings +
      adminTimeSavings +
      providerTimeSavings;

    setResults({
      denialSavings,
      roomUtilizationSavings,
      nurseTimeSavings,
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
      title: "Facility Overview",
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
          label: "Claim Amount",
        },
        {
          key: "lagTimes",
          label: "Lag Times",
        },
      ],
    },
    {
      title: "Staff Information",
      inputs: [
        {
          key: "nurseSalary",
          label: "Nurse Salary",
        },
        {
          key: "nurseCount",
          label: "Nurse Count",
        },
        {
          key: "adminCount",
          label: "Admin Staff Count",
        },
        {
          key: "adminSalary",
          label: "Admin Salary",
        },
        {
          key: "providerCount",
          label: "Provider Count",
        },
        {
          key: "providerSalary",
          label: "Provider Salary",
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
              disabled={results !== null}
              className={`w-full px-6 py-4 rounded-xl flex items-center justify-center text-lg shadow-lg transition-all duration-200 ${
                results
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-birthmodel-teal text-white hover:bg-opacity-90"
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
                    Reduced Claim Denials
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
                    Based on 94% reduction in first-pass denials
                  </p>
                </div>

                <div className="bg-birthmodel-blue-light/30 border-l-4 border-birthmodel-teal p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-birthmodel-teal mb-2">
                    Room Utilization Optimization
                  </h3>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-birthmodel-teal">
                      ${results.roomUtilizationSavings.toLocaleString()}
                    </p>
                    <span className="ml-2 text-sm text-birthmodel-gray">
                      per year
                    </span>
                  </div>
                  <p className="text-sm text-birthmodel-gray mt-2">
                    Based on 15% improvement in efficiency
                  </p>
                </div>

                <div className="bg-birthmodel-blue-light/30 border-l-4 border-birthmodel-teal p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-birthmodel-teal mb-4">
                    Staff Time Savings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-birthmodel-gray mb-1">
                        Nurses
                      </p>
                      <p className="text-xl font-bold text-birthmodel-teal">
                        ${results.nurseTimeSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-birthmodel-gray mt-1">
                        3 hrs/shift saved
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-birthmodel-gray mb-1">
                        Administrators
                      </p>
                      <p className="text-xl font-bold text-birthmodel-teal">
                        ${results.adminTimeSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-birthmodel-gray mt-1">
                        4 hrs/day saved
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-birthmodel-gray mb-1">
                        Providers
                      </p>
                      <p className="text-xl font-bold text-birthmodel-teal">
                        ${results.providerTimeSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-birthmodel-gray mt-1">
                        5 hrs/day saved
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-birthmodel-teal p-8 rounded-xl">
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Total Annual Savings
                    </h3>
                    <div className="flex items-baseline">
                      <p className="text-4xl font-bold text-white">
                        ${results.totalSavings.toLocaleString()}
                      </p>
                      <span className="ml-2 text-lg text-white/80">
                        per year
                      </span>
                    </div>
                    <p className="text-sm text-white/80 mt-2">
                      Combined savings from all improvements
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-birthmodel-blue/20 rounded-full transform translate-x-32 -translate-y-32"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-birthmodel-blue/10 rounded-full transform translate-x-16 translate-y-16"></div>
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
