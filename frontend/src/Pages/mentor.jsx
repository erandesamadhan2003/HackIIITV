import { useEffect, useState } from "react";
import axios from "axios";

const AllMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [expandedMentor, setExpandedMentor] = useState(null); // Track which mentor is expanded

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/mentors/getallmentors");
        setMentors(response.data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const toggleExpand = (id) => {
    setExpandedMentor(expandedMentor === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0D021F] py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-[#7E3AF2] mb-10">
        Meet Our Mentors
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            className="bg-[#1a0735] border border-[#4A00E0] text-[#EAEAEA] rounded-xl shadow-lg p-6 hover:shadow-purple-600 transition duration-300"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src="https://avatars.githubusercontent.com/u/583231?v=4"
                alt="Mentor Avatar"
                className="w-20 h-20 rounded-full border-2 border-[#7E3AF2] object-cover shadow-md"
              />
            </div>

            {/* Basic Details */}
            <h2 className="text-2xl font-semibold text-[#9B51E0] text-center">{mentor.name}</h2>
            <p className="mt-2 text-center">
              <span className="font-semibold text-[#7E3AF2]">Expertise:</span> {mentor.expertise?.join(", ")}
            </p>

            {/* Toggle button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => toggleExpand(mentor._id)}
                className="text-sm text-[#4A00E0] hover:underline focus:outline-none"
              >
                {expandedMentor === mentor._id ? "Show Less" : "Read More"}
              </button>
            </div>

            {/* Additional Details - Shown when expanded */}
            {expandedMentor === mentor._id && (
              <div className="mt-4 text-sm text-gray-300 space-y-2">
                <p><span className="text-[#7E3AF2] font-semibold">Email:</span> {mentor.email}</p>
                <p><span className="text-[#7E3AF2] font-semibold">Year:</span> {mentor.year}</p>
                <p><span className="text-[#7E3AF2] font-semibold">Experience:</span> {mentor.experience}</p>
                <p><span className="text-[#7E3AF2] font-semibold">Projects:</span> {mentor.projects?.join(", ")}</p>
                <p>
                  <span className="text-[#7E3AF2] font-semibold">Availability:</span> {mentor.availability?.days?.join(", ")} at {mentor.availability?.time}
                </p>
                <div className="flex gap-3">
                  {mentor.socials?.github && (
                    <a href={mentor.socials.github} target="_blank" className="text-[#4A00E0] hover:underline">
                      GitHub
                    </a>
                  )}
                  {mentor.socials?.linkedin && (
                    <a href={mentor.socials.linkedin} target="_blank" className="text-[#4A00E0] hover:underline">
                      LinkedIn
                    </a>
                  )}
                </div>
                <p className="italic text-gray-400">{mentor.bio}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMentors;
