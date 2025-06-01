import { Route, Routes } from "react-router-dom";
import ResumeForm from './ResumeForm/index.tsx';

const ResumeBuilderRoutes = () => (
    <Routes>
      <Route index element={<ResumeForm/>} />
    </Routes>
);

export default ResumeBuilderRoutes;
