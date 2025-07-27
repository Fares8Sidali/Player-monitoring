import User from "../models/UserModel.js"

export const updateuser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Body reçu pour update :", req.body)
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}