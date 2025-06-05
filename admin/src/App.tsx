import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AdminLayout from './layout/adminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<AdminLayout />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
