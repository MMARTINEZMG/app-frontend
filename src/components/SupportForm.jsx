import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const SupportForm = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value || "",
      type: e.target.type.value,
      priorityLevel: e.target.priorityLevel.value,
      description: e.target.description.value,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de soporte");
      }

      const result = await response.json();

      setResponseMessage(
        `¡Gracias, ${formData.name}! Hemos recibido tu solicitud de soporte. Te contactaremos pronto al correo ${formData.email}.`
      );
      e.target.reset();
    } catch (error) {
      setResponseMessage(
        "Ocurrió un error al enviar tu solicitud. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      <div className="w-[40%] bg-[#1a1b1f] flex items-center justify-center py-12 rounded-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-left text-[#d7d9dd]">
            Submit Support Request
          </h1>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-[#7d7a78] mb-2 block">Full Name</span>
              <input
                type="text"
                name="name"
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-[#7d7a78] mb-2 block">E-mail</span>
              <input
                type="email"
                name="email"
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-[#7d7a78] mb-2 block">
                Phone (optional)
              </span>
              <input
                type="text"
                name="phone"
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
              />
            </label>
            <label className="block mb-4">
              <span className="text-[#7d7a78] mb-2 block">Type of Issue</span>
              <select
                name="type"
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                required
              >
                <option value="" disabled>
                  Select issue type
                </option>
                <option value="technical">Technical issue</option>
                <option value="billing">Billing issue</option>
                <option value="account">Account issue</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="block mb-4">
              <span className="text-[#7d7a78] mb-2 block">Priority Level</span>
              <select
                name="priorityLevel"
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                required
              >
                <option value="" disabled>
                  Select priority level
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-[#7d7a78] mb-2 block">Description</span>
              <textarea
                name="description"
                className="bg-[#212327] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6061df]"
                rows="5"
                required
              ></textarea>
            </label>
            <button
              type="submit"
              className="w-full bg-[#A8FF53] text-black p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
          {responseMessage && (
            <div
              className={`mt-4 p-2 rounded ${
                responseMessage.includes("Gracias")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
