import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ThemeProvider } from "./contexts/themeProvider";

import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./components/home/home";
import ErrorPage from "./pages/errors/errorPage";
import AboutMe from "./pages/about";
import ResourcesInfo from "./pages/resources/resoursesInfo";

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
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
