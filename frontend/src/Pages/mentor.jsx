import { useEffect, useState } from "react";
import axios from "axios";
import { MentorCard } from "@/components/mentorCard";

const AllMentors = () => {
  const [mentors, setMentors] = useState([]);

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



  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-neutral-300 mb-10">
        Meet Our Mentors
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {mentors.map((mentor) => (
            <>
            <MentorCard key={mentor.id} mentor={mentor}/>
            </>

        ))}
      </div>
    </div>
  );
};

export default AllMentors;
