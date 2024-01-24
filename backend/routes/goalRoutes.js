import express from "express";
import {
  GetGoal,
  SetGoal,
  UpdateGoal,
  DeleteGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.route('/').get(GetGoal).post(SetGoal)
router.route('/:id').put(UpdateGoal).delete(DeleteGoal)

export default router;
