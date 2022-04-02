import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin";
import Admin from "./Pages/Admin";
import DataTable from "./Components/ReceiveDonations/DataTable";
import CallForDonations from "./Components/CallForDonation/CallForDonations";
import StocksTable from "./Components/Stocks/DataTable";
import UsersTable from "./Components/Users/UsersTable";
import Home from "./Pages/Home";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/dataprivacy" element={<PrivacyPolicy />} />
      <Route path="/signin" element={<Signin />} />

      <Route path="admin" element={<Admin />}>
        <Route index element={<Navigate to="receivedonations" />} />
        <Route path="receivedonations" element={<DataTable />} />
        <Route path="callfordonations" element={<CallForDonations />} />
        <Route path="stocks" element={<StocksTable />} />
        <Route path="users" element={<UsersTable />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
