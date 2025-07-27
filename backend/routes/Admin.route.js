import express from "express";
import { updateuser } from "../controller/Admin.controller.js";

const Adminroute = express.Router()

Adminroute.put("/update/:id",updateuser)

export default Adminroute