import asyncHandler from "express-async-handler";
const GetGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goal" });
});

const SetGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a text");
  }
  res.status(200).json({ message: "Set goal" });
});

const UpdateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

const DeleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

export { GetGoal, SetGoal, UpdateGoal, DeleteGoal };
