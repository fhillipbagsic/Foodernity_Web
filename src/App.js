import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";
import Admin from "./Pages/Admin";
import DataTable from "./Components/ReceiveDonations/DataTable";
import CallForDonations from "./Components/CallForDonation/CallForDonations";

function App() {
  return (
    <Routes>
      <Route index element={<Signin />} />
      <Route path="admin" element={<Admin />}>
        <Route index element={<Navigate to="receivedonations" />} />
        <Route path="receivedonations" element={<DataTable />} />
        <Route path="callfordonations" element={<CallForDonations />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
