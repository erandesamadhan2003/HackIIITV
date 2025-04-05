import { CollaborationRequest } from "../modules/Collaboration.js";

export const createCollaborationRequest = async (req, res) => {
  const {
    mentorId,
    menteeId,
    projectTitle,
    description,
    requiredSkills,
    duration,
  } = req.body;

  try {
 
    const existingRequest = await CollaborationRequest.findOne({
      mentorId,
      menteeId,
      projectTitle,
      status: "pending"
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A similar pending request already exists." });
    }

    const newRequest = new CollaborationRequest({
      mentorId,
      menteeId,
      projectTitle,
      description,
      requiredSkills,
      duration,
    });

    await newRequest.save();
    res.status(201).json({ message: "Collaboration request sent successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
