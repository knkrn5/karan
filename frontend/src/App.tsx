import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import './app.css';

import Home from './pages/home/home';
import ErrorPage404 from './pages/errors/404-error-page';

import Header from './components/common/header';
import Footer from './components/common/footer';

import AffiliateLayout from './pages/affiliates/affiliateLayout';
import AffiliateProductsPage from './pages/affiliates/affiliateProductsPage';
import AfflilateProductNA from './pages/affiliates/afflilateProductNA';

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

import AdminLayout from './admin/adminLayout';
import AdminDashboard from './admin/adminDashboard';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

import AccessPassSetter from './utils/accessPassSetter';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      navigate('/admin/dashboard');
    }
  }, [location.pathname, navigate]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  const hasPermission = localStorage.getItem('accessPass') === 'onlykaranhastheaccesspermission';

  return (
    <>
      {/* notification popup */}
      <TRpopupNotificationModel />

      {/* Authentication popup */}
      <AuthPopup />

      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<ErrorPage404 />} />

          <Route path="/affiliates/*" element={<AffiliateLayout />}>
            <Route index element={<AffiliateProductsPage />} />
            <Route path="product-not-available" element={<AfflilateProductNA />} />
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
          <Route path="/resume" element={hasPermission ? <Resume /> : <AccessPassSetter />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
