import AddUserForm from './pages/AddUser';
import Header from './components/Header'
import Dashboard from './pages/Dashboard';
import Project from './pages/Project'
import Task from './pages/Task';
import Customer from './pages/Customer';
import Invoice from './pages/Invoice';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Attendance from './pages/Attendance';

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
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/invoice" element={<Invoice />} />
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
