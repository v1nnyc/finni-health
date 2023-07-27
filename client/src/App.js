import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout, AddPatient } from "./pages/dashboard/index";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";
import AllPatients from "./pages/dashboard/AllPatients";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="add-patient" element={<AddPatient />} />
          <Route path="all-patients" element={<AllPatients />} />
        </Route>
        <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
