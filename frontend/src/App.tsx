import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';

import Home from './pages/home/home';
import ErrorPage404 from './pages/errors/404-error-page';

import Header from './components/common/header';
import Footer from './components/common/footer';

import AffiliateLayout from './pages/affiliates/affiliateLayout';
import AffiliateProductsPage from './pages/affiliates/affiliateProductsPage';

import ResourcesInfo from './pages/resources/resoursesPage';
import BlogPage from './pages/blog/blogPostsPage';

import AuthLayout from './pages/auth/authLayout';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';

import About from './pages/about/aboutPage';
import Resume from './pages/about/resume';
import Contact from './pages/contact/contactPage';
import UserProfile from './pages/profile/userProfile';

import SoloBlogPost from './pages/blog/soloBlogPostPage';
import { TRpopupNotificationModel } from './components/popups/TRpopupNotification';
import ResetPassward from './pages/auth/resetPassward';
import AuthPopup from './pages/auth/authPopup';

function AppContent() {
  const location = useLocation();

  // ❌ List of paths where to hide the Footer
  const hideFooterOnPaths = ['/affiliates'];

  const shouldShowFooter = !hideFooterOnPaths.includes(location.pathname);

  return (
    <>
      {/* notification popup */}
      <TRpopupNotificationModel />

      {/* Authentication popup */}
      <AuthPopup />

      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<ErrorPage404 />} />

          <Route path="/affiliates/*" element={<AffiliateLayout />}>
            <Route index element={<AffiliateProductsPage />} />
          </Route>

          <Route path="/resources" element={<ResourcesInfo />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/post/:slug" element={<SoloBlogPost />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPassward />} />
          </Route>

          <Route path="/profile" element={<UserProfile />} />

          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {shouldShowFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
