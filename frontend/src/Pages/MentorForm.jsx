import { useState } from "react";
import axios from "axios";

const MentorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    expertise: [],
    experience: "",
    projects: [],
    availability: { days: [], time: "" },
    socials: { github: "", linkedin: "" },
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["expertise", "projects"].includes(name)) {
      setFormData({ ...formData, [name]: value.split(",") });
    } else if (["days"].includes(name)) {
      setFormData({ ...formData, availability: { ...formData.availability, days: value.split(",") } });
    } else if (["time"].includes(name)) {
      setFormData({ ...formData, availability: { ...formData.availability, time: value } });
    } else if (["github", "linkedin"].includes(name)) {
      setFormData({ ...formData, socials: { ...formData.socials, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/mentors/registermentors", formData);
    alert("Mentor Registered!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D021F]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a0735] shadow-lg rounded-xl p-8 w-full max-w-2xl text-[#EAEAEA] border border-[#4A00E0]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#7E3AF2]">Register as Mentor</h2>

        {[
          { name: "name", placeholder: "Name" },
          { name: "email", placeholder: "Email" },
          { name: "year", placeholder: "Year" },
          { name: "expertise", placeholder: "Expertise (comma-separated)" },
          { name: "experience", placeholder: "Experience" },
          { name: "projects", placeholder: "Projects (comma-separated)" },
          { name: "days", placeholder: "Available Days (Mon,Tue,...)" },
          { name: "time", placeholder: "Available Time (e.g. 4PM - 6PM)" },
          { name: "github", placeholder: "GitHub URL" },
          { name: "linkedin", placeholder: "LinkedIn URL" },
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
          name="bio"
          placeholder="Your Bio"
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

export default MentorForm;
