import Header from "./Components/Header";
import JobBoard from "./Components/JobBoard";
import Footer from "./Components/Footer";
import "./page.css";

export default function Home() {
  return (
    <div>
      <Header />
      <JobBoard />
      <Footer />
    </div>
  );
}
