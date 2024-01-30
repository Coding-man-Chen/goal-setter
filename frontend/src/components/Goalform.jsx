import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  useDispatch } from "react-redux";
import { createGoal, getGoals, reset } from "../features/goals/goalSlice";
const Goalform = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            value={text}
            className="text"
            id="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Goalform;
