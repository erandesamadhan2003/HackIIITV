import { useNavigate } from "react-router-dom";

export const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/mentor/${mentor._id}`, { state: { mentor } });
  };

  return (
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
        <span className="font-semibold text-[#7E3AF2]">Expertise:</span>{" "}
        {mentor.expertise?.join(", ")}
      </p>

      {/* Read More Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleReadMore}
          className="text-sm text-[#4A00E0] hover:underline focus:outline-none"
        >
          Read More
        </button>
      </div>
    </div>
  );
};
