import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}
