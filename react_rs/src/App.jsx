import { Routes, Route } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import PasienList from "./pages/PasienList";
import DokterList from "./pages/DokterList";
import KunjunganList from "./pages/KunjunganList";
import TindakanList from "./pages/TindakanList";
import DetailTindakanList from "./pages/DetailTindakanList";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route element={<MainLayout />}>
        <Route path="/pasien" element={<PasienList />} />
        <Route path="/dokter" element={<DokterList />} />
        <Route path="/kunjungan" element={<KunjunganList />} />
        <Route path="/tindakan" element={<TindakanList />} />
        <Route path="/detail_tindakan" element={<DetailTindakanList />} />
      </Route>
    </Routes>
  );
}

export default App;
