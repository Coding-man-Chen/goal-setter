import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Goalform from "../components/Goalform";
import { getGoals, reset } from "../features/goals/goalSlice";
import { Spinner } from "../components/Spinner";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getGoals());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate, isError, message]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <Goalform />
      {goals.length > 800 ? (
        <section className="content">
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal._id} />
            ))}
          </div>
        </section>
      ) : (
        <h3> You have not set any goals</h3>
      )}
    </>
  );
};

export default Dashboard;
