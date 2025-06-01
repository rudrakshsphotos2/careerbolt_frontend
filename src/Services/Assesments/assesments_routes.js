import { Route, Routes } from "react-router-dom";
import AssessmentsHome from "./pages/homepage/assesment_homepage";
import ResumeCheckList from "./pages/resume_checklist/resume_checklist";
import ResumeCheckResults from "./pages/resume_check_results/resume_check_results";
import BranchSelectionUg from "./pages/branch_selection_ug/branch_selection_ug";
import BranchResults from "./pages/branch_selection_result/branch_selection_result";

const AssesmentsRoutes = () => (
    <Routes>
      <Route index element={<AssessmentsHome/>} />
      <Route path="resume-check" element={<ResumeCheckList/>} />
      <Route path="resume-check-results" element={<ResumeCheckResults/>} />
      <Route path="branch-selection" element={<BranchSelectionUg/>} />
      <Route path="branch-selection-result" element={<BranchResults/>} />
    </Routes>
);

export default AssesmentsRoutes;
