import express from "express"; 
import { userData,emailData} from "../Controllers/userController.js";
const router = express.Router()

router.post("/create",userData)

router.post("/send-Email",emailData)





export default router