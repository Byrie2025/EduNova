import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Courses from './pages/Courses'
import Assignments from './pages/Assignments'
import Grades from './pages/Grades'
import Attendance from './pages/Attendance'
import Practice from './pages/Practice'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App