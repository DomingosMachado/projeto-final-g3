import styles from "./home.module.css";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";

export function Homepage() {
  return (
    <>
      <Navbar />
      {/* ...existing homepage content... */}
      <Footer />
    </>
  );
}
