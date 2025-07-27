import express from "express";
import { checkAuth, getapercu, login, logout, signup, updateProfile, updateuser} from "../controller/Auth.controller.js";
import { protectRoute } from "../middleware/Authmiddleware.js";

const Authrouter = express.Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", login);
Authrouter.post("/logout", logout);
Authrouter.put("/update-profile", protectRoute, updateProfile);
Authrouter.get("/check", protectRoute, checkAuth);
Authrouter.get("/overview",getapercu);
Authrouter.put("/update/:id",updateuser)

export default Authrouter;