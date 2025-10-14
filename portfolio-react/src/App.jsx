import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import ServicesManagement from './pages/ServicesManagement';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/services" element={<ServicesManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
