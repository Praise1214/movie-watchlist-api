import express from "express"
import {addToWatchList} from "../controllers/watchlistController"
import { authMiddleWare } from "../middleware/authMiddleware"


const router = express.Router()

router.use(authMiddleWare)

router.post("/", addToWatchList)

export default router
