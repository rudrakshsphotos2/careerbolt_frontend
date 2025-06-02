import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeBuilderRoutes from './Services/ResumeBuilder/components/resume_builder_routes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home/>} />
        
        {/* Service Routes */}
        <Route path="/resume-builder/*" element={<ResumeBuilderRoutes/>} />
      </Routes>
    </Router>
  );
}

const Home = () => <h2>Home</h2>;

export default App;
