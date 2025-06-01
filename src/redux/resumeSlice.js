import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Function to retrieve and combine resume data from localStorage
const getResumeDataFromLocalStorage = () => {
  return {
    personal_details: JSON.parse(localStorage.getItem("personal_details")) || {},
    objective: JSON.parse(localStorage.getItem("objective")) || {},
    education: JSON.parse(localStorage.getItem("education")) || [],
    work_experiences: JSON.parse(localStorage.getItem("work_experiences")) || [],
    other_experiences: JSON.parse(localStorage.getItem("other_experiences")) || [],
    skills_and_certificates: JSON.parse(localStorage.getItem("skills_and_certificates")) || {},
  };
};

// Async action to send POST request
export const compileLatex = createAsyncThunk(
  "resume/compileLatex",
  async (_, { rejectWithValue }) => {
    try {
      const resumeData = getResumeDataFromLocalStorage(); // Fetch merged data

      const response = await fetch(`${process.env.REACT_APP_API_URL}/resume_builder/compile_latex`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error("Failed to compile LaTeX");
      }

      const blob = await response.blob();

      return blob;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    loading: false,
    pdfUrl: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(compileLatex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(compileLatex.fulfilled, (state, action) => {
        state.pdfUrl = window.URL.createObjectURL(action.payload);
        state.loading = false;
      })
      .addCase(compileLatex.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default resumeSlice.reducer;
