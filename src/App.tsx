import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Publications from "./pages/admin/Publications";
import CreatePublication from "./pages/admin/CreatePublication";
import PublicationDetails from "./pages/admin/PublicationDetails";
import AntiFraud from "./pages/admin/AntiFraud";
import Moderation from "./pages/admin/Moderation";

import UserLayout from "./layouts/UserLayout";
import Cabinet from "./pages/user/Cabinet";
import EventDetails from "./pages/user/EventDetails";

import { SplashScreen } from "./components/ui/SplashScreen";

export default function App() {
  return (
    <SplashScreen>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="publications" element={<Publications />} />
            <Route path="publications/create" element={<CreatePublication />} />
            <Route path="publications/:id" element={<PublicationDetails />} />
            <Route path="antifraud" element={<AntiFraud />} />
            <Route path="moderation" element={<Moderation />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Cabinet />} />
            <Route path="event/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SplashScreen>
  );
}
