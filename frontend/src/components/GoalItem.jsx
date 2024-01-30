import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [editInput, setEditInput] = useState(false);
  const handleUpdate = (goalId) => {
    dispatch(
      updateGoal({
        id: goalId,
        text: inputRef.current.value,
      })
    );
  };
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-GB")}</div>
      {editInput && (
        <>
          <input
            type="text"
            className="editText"
            defaultValue={goal.text}
            ref={inputRef}
            id="text"
          />
          <button
            className="btn btn-update"
            onClick={() => handleUpdate(goal._id)}
          >
            Update
          </button>
        </>
      )}
      <h2>{goal.text}</h2>
      {editInput ? (
        <button className="edit" onClick={() => setEditInput(false)}>
          Close
        </button>
      ) : (
        <button className="edit" onClick={() => setEditInput(true)}>
          Edit
        </button>
      )}

      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
