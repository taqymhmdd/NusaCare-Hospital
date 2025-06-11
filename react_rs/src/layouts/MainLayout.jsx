import React, { useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/pasien", label: "Pasien" },
    { path: "/dokter", label: "Dokter" },
    { path: "/kunjungan", label: "Kunjungan" },
    { path: "/tindakan", label: "Tindakan" },
    { path: "/detail_tindakan", label: "Detail Tindakan" },
  ];

  return (
    <>
      {/* Navbar */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.logoLink}>
            <div style={styles.logoContainer}>
              <img
                src="/images/medical.png"
                alt="NusaCare Logo"
                style={styles.logoImg}
              />
              <span style={styles.logoText}>NusaCare</span>
            </div>
          </Link>

          <div style={styles.navLinks}>
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                style={{
                  ...styles.link,
                  ...(location.pathname === path ? styles.activeLink : {}),
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Content (children components) */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 NusaCare Hospital. All rights reserved.</p>
      </footer>
    </>
  );
};

const styles = {
  header: {
    width: "100%",
    background: "linear-gradient(90deg, #004e92 0%, #000428 100%)",
    padding: "1rem 5vw",
    color: "#e0e7ff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 3px 15px rgba(0, 0, 0, 0.4)",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logoLink: {
    textDecoration: "none",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoImg: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    border: "2px solid #82aaff",
  },
  logoText: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#e0e7ff",
    fontFamily: "'Poppins', sans-serif",
  },
  navLinks: {
    display: "flex",
    gap: "28px",
    flexWrap: "wrap",
  },
  link: {
    color: "#a8bbff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 14px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  activeLink: {
    backgroundColor: "#ffcc00",
    color: "#000a12",
    fontWeight: "700",
    boxShadow: "0 4px 12px #ffcc0088",
  },
  main: {
    width: "100%",
    overflowX: "hidden",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f4f8fb",
    color: "#2c3e50",
    minHeight: "80vh",
    padding: "2rem 5vw",
  },
  footer: {
    backgroundColor: "#001f3f",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
  },
};

export default MainLayout;
