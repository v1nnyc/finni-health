import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout, AddPatient } from "./pages/dashboard/index";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";

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
        </Route>
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
