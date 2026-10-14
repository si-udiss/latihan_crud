import Create from './Pages/Create';
import Home from './Pages/Home';
import Update from './Pages/Update';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
