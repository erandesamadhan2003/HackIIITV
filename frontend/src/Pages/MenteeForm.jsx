import { useState } from "react";
import axios from "axios";

const MenteeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    goals: "",
    skills: [],
    interests: [],
    expectations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["skills", "interests"].includes(name)) {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/mentees/registermentee", formData);
    alert("Mentee Registered!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D021F]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a0735] shadow-lg rounded-xl p-8 w-full max-w-2xl text-[#EAEAEA] border border-[#4A00E0]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#7E3AF2]">Register as Mentee</h2>

        {[
          { name: "name", placeholder: "Name" },
          { name: "email", placeholder: "Email" },
          { name: "year", placeholder: "Year" },
          { name: "skills", placeholder: "Skills (comma-separated)" },
          { name: "interests", placeholder: "Interests (comma-separated)" },
        ].map((input) => (
          <input
            key={input.name}
            name={input.name}
            placeholder={input.placeholder}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg bg-[#120428] border border-[#4A00E0] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9B51E0]"
          />
        ))}

        <textarea
          name="goals"
          placeholder="Your Goals"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-[#120428] border border-[#4A00E0] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9B51E0]"
        />

        <textarea
          name="expectations"
          placeholder="Expectations"
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-[#120428] border border-[#4A00E0] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9B51E0]"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#7E3AF2] hover:bg-[#9B51E0] text-white font-semibold transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MenteeForm;
