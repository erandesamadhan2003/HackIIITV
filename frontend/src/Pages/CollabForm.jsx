import { useState } from "react";
import axios from "axios";

const CollabForm = () => {
  const [formData, setFormData] = useState({
    mentorId: "",
    menteeId: "",
    projectTitle: "",
    description: "",
    requiredSkills: [],
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "requiredSkills") {
      setFormData({ ...formData, requiredSkills: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/collaboration/create", formData);
    alert("Collaboration request sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 shadow-xl rounded-xl p-8 w-full max-w-2xl text-[#EAEAEA] border border-[#4A00E0]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#7E3AF2]">
          Request Project Collaboration
        </h2>

        {[
          { name: "mentorId", placeholder: "Mentor ID" },
          { name: "menteeId", placeholder: "Mentee ID" },
          { name: "projectTitle", placeholder: "Project Title" },
          { name: "requiredSkills", placeholder: "Required Skills (comma-separated)" },
          { name: "duration", placeholder: "Duration (e.g., 2 weeks)" },
        ].map((input) => (
          <input
            key={input.name}
            name={input.name}
            placeholder={input.placeholder}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-sm bg-zinc-800  placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        ))}

        <textarea
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-sm bg-zinc-800  placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-sm bg-blue-400 hover:bg-blue-300 text-white font-semibold transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CollabForm;
