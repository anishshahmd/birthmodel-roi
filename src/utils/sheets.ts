import { ContactForm,CalculationResults } from '../types';

const BIN_ID ="67aef93eacd3cb34a8e1bed7"
const BIN_API_KEY="$2a$10$.r5T7AbIFck3CI7kh.gRJuuZPZFceeWTuWQtnfwUJDeVzRtMGdbQ2"

export const submitToGoogleSheets = async (formData: ContactForm,results:CalculationResults) => {
  const combined ={...formData,...results}
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": BIN_API_KEY },
    });

    const jsonData = await res.json();
    const updatedData = [...jsonData.record.submissions, combined];
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": BIN_API_KEY,
      },
      body: JSON.stringify({ submissions: updatedData }),
    });

    alert("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
  
};
