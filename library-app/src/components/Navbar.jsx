import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#38bdf8" : "white",
    textDecoration: "none",
    marginRight: 16,
    fontWeight: "bold",
  });

  return (
    <nav style={{ background: "#111827", padding: "12px 24px" }}>
      <NavLink to="/" style={linkStyle}>Ana Sayfa</NavLink>
      <NavLink to="/publishers" style={linkStyle}>Yayımcı</NavLink>
      <NavLink to="/categories" style={linkStyle}>Kategori</NavLink>
      <NavLink to="/authors" style={linkStyle}>Yazar</NavLink>
      <NavLink to="/books" style={linkStyle}>Kitap</NavLink>
      <NavLink to="/book-loans" style={linkStyle}>Kitap Alma</NavLink>
    </nav>
  );
}
