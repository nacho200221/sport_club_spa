import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Unauthorized from "../pages/Unauthorized"

import UserDashboard from "../pages/user/UserDashboard"
import CoachDashboard from "../pages/coach/CoachDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"

import UserLayout from "../layouts/UserLayout"
import CoachLayout from "../layouts/CoachLayout"
import AdminLayout from "../layouts/AdminLayout"

import ProtectedRoute from "./ProtectedRoute"
import RoleRoute from "./RoleRoute"

import UsersPage from "../pages/admin/UsersPage"

import Register from "../pages/register"

import Profile from "../pages/Profile";

import RoomsPage from "../pages/admin/RoomsPage";

import AssignmentsPage from "../pages/admin/AssignmentsPage";

import SchedulesPage from "../pages/admin/SchedulesPage";

import MyClassesPage from "../pages/coach/MyClassesPage";

import MySchedulesPage from "../pages/coach/MySchedulesPage";

import AvailableClassesPage from "../pages/user/AvailableClassesPage";

import MyReservationsPage from "../pages/user/MyReservationsPage";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        
        <Route path="/user" element={
          <RoleRoute allowedRoles={["user"]}>
            <UserLayout />
          </RoleRoute>
        }>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        
        <Route path="/coach" element={
          <RoleRoute allowedRoles={["coach"]}>
            <CoachLayout />
          </RoleRoute>
        }>
          <Route path="dashboard" element={<CoachDashboard />} />
        </Route>

        
        <Route path="/admin" element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </RoleRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/admin/rooms" element={<RoomsPage />} />

        <Route path="/admin/assignments" element={<AdminLayout><AssignmentsPage /></AdminLayout>} />

        <Route path="/admin/schedules" element={<AdminLayout><SchedulesPage /></AdminLayout>} />
        
        <Route path="/coach/classes" element={<CoachLayout><MyClassesPage /></CoachLayout>} />

        <Route path="/coach/schedules" element={<CoachLayout><MySchedulesPage /></CoachLayout>} />

        <Route path="/user/classes" element={<UserLayout><AvailableClassesPage /></UserLayout>} />

        <Route path="/user/reservations" element={<UserLayout><MyReservationsPage /></UserLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes