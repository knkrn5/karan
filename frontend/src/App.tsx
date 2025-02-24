import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ThemeProvider } from "./contexts/themeProvider";

import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./components/home/home";
import ErrorPage from "./pages/errors/404-error-page";
import ResourcesInfo from "./pages/resources/resourses-page";

import AboutMe from "./pages/about/about-page";
import Contact from "./pages/contact/contact-page";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Header />
        <main>
          <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<ErrorPage />} />

              <Route path="/resources" element={<ResourcesInfo />} />

              <Route path="/about" element={<AboutMe />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
