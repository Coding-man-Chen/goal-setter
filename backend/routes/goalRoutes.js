import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  GetGoal,
  SetGoal,
  UpdateGoal,
  DeleteGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.route('/').get(protect, GetGoal).post(protect, SetGoal)
router.route('/:id').put(protect, UpdateGoal).delete(protect, DeleteGoal)

export default router;
