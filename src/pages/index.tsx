import type { NextPage } from "next";
import Dashboard from "../components/Dashboard";
import { AuthProvider } from "../contexts/AuthContext";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col bg-slate-800 min-h-screen items-center justify-center py-8 gap-4 relative">
      <h1 className="text-3xl text-gray-300 font-bold">Agenda DIEL</h1>
      <Dashboard />
    </div>
  );
};

export default Home;
