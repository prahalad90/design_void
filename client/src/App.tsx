import AddUserForm from './pages/AddUser';
import Header from './components/Header'
import Dashboard from './pages/Dashboard';
import Project from './pages/Project'
import Task from './pages/Task';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

function App() {

  return (
    <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Private Routes (Protected) */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Header>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/task" element={<Task />} />
                <Route path="/project" element={<Project />} />
                <Route path="/user" element={<AddUserForm />} />
              </Routes>
            </Header>
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
