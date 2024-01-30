import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getAll(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(goalId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (updateGoal,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.updateGoal(updateGoal,token)
    } catch (error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    }
  }
)

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createGoal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(action.payload);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getGoals.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = action.payload;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(deleteGoal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = state.goals.filter(goal => goal._id !== action.payload.id);
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateGoal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = state.goals.map(goal => {
        if(goal._id === action.payload._id){
          return action.payload
        }
        else{
          return goal
        }
      });
    });
    builder.addCase(updateGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
