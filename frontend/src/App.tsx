import { BrowserRouter as Router, Routes, Route } from "react-router";

import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./components/home/home";
import ErrorPage from "./pages/errors/404-error-page";
import ResourcesInfo from "./pages/resources/resourses-page";

import AuthLayout from "./pages/auth/authLayout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

import About from "./pages/about/aboutPage";
import Contact from "./pages/contact/contactPage";

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/resources" element={<ResourcesInfo />} />

          <Route element={<AuthLayout />}>
            <Route
              path="login"
              element={<LoginPage />}
            />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
