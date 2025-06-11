import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  faStethoscope,
  faHospitalUser,
  faAmbulance,
  faVials,
  faUserMd,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardHome = () => {
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

      {/* Hero Section */}
      <main style={styles.main}>
        <section style={styles.hero}>
          <img
            src="/images/h1.avif"
            alt="Rumah Sakit Modern"
            style={styles.heroImage}
          />
          <div style={styles.overlay} />
          <div style={styles.heroContent} data-aos="zoom-in">
            <h1 style={styles.title}>NusaCare Hospital</h1>
            <p style={styles.subtitle}>Pelayanan Medis Modern & Profesional</p>
            <button
              style={styles.ctaButton}
              onClick={() =>
                window.scrollTo({ top: 800, behavior: "smooth" })
              }
            >
              Lihat Layanan Kami
            </button>
          </div>
        </section>

        {/* Info Section */}
        <section style={styles.infoSection}>
          <div style={styles.columns}>
            {/* Tentang Kami */}
            <div style={styles.leftColumn} data-aos="fade-right">
              <h2 style={styles.sectionTitle}>Tentang Kami</h2>
              <p style={styles.text}>
                NusaCare adalah rumah sakit berstandar internasional yang
                menggabungkan teknologi mutakhir dengan tenaga medis terbaik.
              </p>

              <h3 style={styles.sectionTitle}>Kontak</h3>
              <p style={styles.text}>
                📍 Jl. Darmawangsa Raya No.13, Jakarta Selatan
                <br />
                ☎️ <a href="tel:02112345678">+62-21-7394484</a>
                <br />
                📧 <a href="mailto:info@nusacare.id">info@nusacare.id</a>
              </p>
              <button
                style={styles.mapButton}
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/6N1XgGSSjhaLN5ALA",
                    "_blank"
                  )
                }
              >
                Lihat Lokasi
              </button>
            </div>

            {/* Layanan */}
            <div style={styles.rightColumn} data-aos="fade-left">
              <h2 style={styles.sectionTitle}>Layanan Unggulan</h2>
              <div style={styles.services}>
                {[
                  { icon: faStethoscope, label: "Rawat Jalan Digital" },
                  { icon: faHospitalUser, label: "Rawat Inap VIP" },
                  { icon: faAmbulance, label: "UGD 24 Jam" },
                  { icon: faVials, label: "Laboratorium Modern" },
                  { icon: faUserMd, label: "Konsultasi Spesialis" },
                  { icon: faHeartPulse, label: "Rehabilitasi Jantung" },
                ].map((service, i) => (
                  <div
                    key={i}
                    style={styles.serviceCard}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <FontAwesomeIcon icon={service.icon} size="2x" />
                    <p>{service.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimoni */}
        <section style={styles.testimoniSection}>
          <h2 style={styles.sectionTitle} data-aos="fade-up">
            Apa Kata Pasien Kami
          </h2>
          <div style={styles.testimoniContainer}>
            <blockquote style={styles.testimoniCard} data-aos="zoom-in-up">
              "Pelayanan cepat, staf ramah, fasilitas modern. Sangat puas!"
              <br />
              <strong>- Budi, Jakarta</strong>
            </blockquote>
            <blockquote style={styles.testimoniCard} data-aos="zoom-in-up">
              "Saya merasa sangat aman dan nyaman dirawat di NusaCare."
              <br />
              <strong>- Siti, Bekasi</strong>
            </blockquote>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© 2025 NusaCare Hospital. All rights reserved.</p>
        </footer>
      </main>
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
  },
  hero: {
    position: "relative",
    width: "100%",
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 22, 45, 0.6)",
    zIndex: 2,
  },
  heroContent: {
    position: "relative",
    zIndex: 3,
    color: "#fff",
  },
  title: {
    fontSize: "3.2rem",
    marginBottom: "0.6rem",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.6rem",
    marginBottom: "1.6rem",
  },
  ctaButton: {
    backgroundColor: "#ffcc00",
    color: "#000",
    fontWeight: "600",
    padding: "12px 24px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  infoSection: {
    padding: "4rem 6vw",
    backgroundColor: "#fff",
  },
  columns: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4rem",
  },
  leftColumn: {
    flex: 1,
    minWidth: "280px",
  },
  rightColumn: {
    flex: 1,
    minWidth: "280px",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#003366",
  },
  text: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  mapButton: {
    marginTop: "1rem",
    backgroundColor: "#004080",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  services: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.2rem",
  },
  serviceCard: {
    background: "#e0f0ff",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  testimoniSection: {
    backgroundColor: "#f0f8ff",
    padding: "4rem 6vw",
    textAlign: "center",
  },
  testimoniContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
    marginTop: "2rem",
  },
  testimoniCard: {
    backgroundColor: "#ffffff",
    padding: "1.6rem",
    borderRadius: "10px",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontStyle: "italic",
  },
  footer: {
    backgroundColor: "#001f3f",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
  },
};

export default DashboardHome;