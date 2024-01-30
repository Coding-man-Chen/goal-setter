import asyncHandler from "express-async-handler";
import { goalModel } from ".././models/goalModel.js";
import { userModel } from "../models/userModel.js";
const GetGoal = asyncHandler(async (req, res) => {
  const goals = await goalModel.find({ user: req.user.id });
  res.status(200).json(goals);
});

const SetGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text");
  }
  const goals = await goalModel.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goals);
});

const UpdateGoal = asyncHandler(async (req, res) => {
  const goals = await goalModel.findById(req.params.id);
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (req.user.id !== goals.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (!goals) {
    res.status(400);
    throw new Error("Goal not found");
  }
  try {
    const uploadedGoal = await goalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(uploadedGoal);
  } catch (error) {
    console.log(error);
  }
});

const DeleteGoal = asyncHandler(async (req, res) => {
  const goals = await goalModel.findById(req.params.id);
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (req.user.id !== goals.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (!goals) {
    res.status(400);
    throw new Error("Goal not found");
  }
  await goals.deleteOne({ id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

export { GetGoal, SetGoal, UpdateGoal, DeleteGoal };
