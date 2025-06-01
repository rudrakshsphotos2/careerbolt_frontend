import { Route, Routes } from "react-router-dom";
import ResumeBuilderMain from "./resume_builder_main";
const ResumeBuilderRoutes = () => (
    <Routes>
      <Route index element={<ResumeBuilderMain/>} />
    </Routes>
);

export default ResumeBuilderRoutes;
