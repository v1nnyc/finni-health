import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout, AddPatient } from "./pages/dashboard/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="add-patient" element={<AddPatient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
