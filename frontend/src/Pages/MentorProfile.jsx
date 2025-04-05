import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const MentorProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const mentor = location.state?.mentor;

  if (!mentor) return <div className="text-white text-center mt-20">No mentor data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0735] to-[#320857] p-6 text-[#EAEAEA]">
      <div className="max-w-4xl mx-auto bg-[#240a4b] rounded-2xl shadow-2xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#7E3AF2] hover:underline mb-4"
        >
          ← Back
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://avatars.githubusercontent.com/u/583231?v=4"
            alt="Mentor Avatar"
            className="w-28 h-28 rounded-full border-4 border-[#7E3AF2] object-cover shadow-lg"
          />
          <h1 className="mt-4 text-4xl font-bold text-[#9B51E0]">{mentor.name}</h1>
          <p className="mt-2 text-lg italic text-gray-300">{mentor.bio}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-purple-900" />

        {/* Mentor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base">
          <div>
            <p><span className="font-semibold text-[#7E3AF2]">Expertise:</span> {mentor.expertise?.join(", ")}</p>
            <p><span className="font-semibold text-[#7E3AF2]">Email:</span> {mentor.email}</p>
            <p><span className="font-semibold text-[#7E3AF2]">Year:</span> {mentor.year}</p>
          </div>
          <div>
            <p><span className="font-semibold text-[#7E3AF2]">Experience:</span> {mentor.experience}</p>
            <p><span className="font-semibold text-[#7E3AF2]">Projects:</span> {mentor.projects?.join(", ")}</p>
            <p>
              <span className="font-semibold text-[#7E3AF2]">Availability:</span>{" "}
              {mentor.availability?.days?.join(", ")} at {mentor.availability?.time}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-6">
          {mentor.socials?.github && (
            <a
              href={mentor.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EAEAEA] hover:text-[#7E3AF2] transition"
            >
              <FaGithub size={24} />
            </a>
          )}
          {mentor.socials?.linkedin && (
            <a
              href={mentor.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EAEAEA] hover:text-[#7E3AF2] transition"
            >
              <FaLinkedin size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
