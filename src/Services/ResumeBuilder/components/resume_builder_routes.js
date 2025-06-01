import { Route, Routes } from "react-router-dom";
import ResumeForm from './ResumeForm/index.tsx';

const ResumeBuilderRoutes = () => (
  <div id="resume-builder" className="min-h-screen bg-gray-50">
    <Routes>
      <Route index element={<ResumeForm/>} />
    </Routes>
  </div>
);

export default ResumeBuilderRoutes;