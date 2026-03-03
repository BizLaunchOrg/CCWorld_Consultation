import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { RequireAdmin } from './components/RequireAdmin';
import { AdminLayout } from './components/admin/AdminLayout';
import { HomePage } from './Pages/HomePage/HomePage';
import { ServicesPage } from './Pages/ServicePage/ServicePage';
import { ServiceDetailsPage } from './Pages/ServiceDeatilsPage/ServiceDetailsPage';
import { ConsultationPage } from './Pages/ConsultationPage/ConsultationPage';
import { AboutPage } from './Pages/AboutPage/AboutPage';
import { InsightsPage } from './Pages/InsightsPage/InsightsPage';
import { TrainingPage } from './Pages/TrainingPage/TrainingPage';
import { TrainingDetailsPage } from './Pages/TrainingDetailsPage/TrainingDetailsPage';
import { TrainingCheckoutPage } from './Pages/TrainingCheckoutPage/TrainingCheckoutPage';
import { TrainingPaymentSuccessPage } from './Pages/TrainingPaymentSuccessPage/TrainingPaymentSuccessPage';
import { LicensingPage } from './Pages/LicensingPage/LicensingPage';
import { LicensingDetailPage } from './Pages/LicensingDetailPage/LicensingDetailPage';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { SignupPage } from './Pages/SignupPage/SignupPage';
import { AdminLoginPage } from './Pages/Admin/AdminLoginPage';
import { AdminUsersPage } from './Pages/Admin/AdminUsersPage';
import { AdminDashboardPage } from './Pages/Admin/AdminDashboardPage';
import { AdminServicesPage } from './Pages/Admin/AdminServicesPage';
import { AdminTrainingsPage } from './Pages/Admin/AdminTrainingsPage';
import { AdminTransactionsPage } from './Pages/Admin/AdminTransactionsPage';
import { AdminConsultationsPage } from './Pages/Admin/AdminConsultationsPage';
import { AdminMessagesPage } from './Pages/Admin/AdminMessagesPage';
import { AdminSettingsPage } from './Pages/Admin/AdminSettingsPage';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Admin login (no layout, no guard) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin dashboard and sub-pages (protected, admin layout) */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="trainings" element={<AdminTrainingsPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="consultations" element={<AdminConsultationsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Public site (main layout with nav + footer + chat) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/licensing" element={<LicensingPage />} />
          <Route path="/licensing/:slug" element={<LicensingDetailPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/training/:slug" element={<TrainingDetailsPage />} />
          <Route path="/checkout/training/:slug" element={<TrainingCheckoutPage />} />
          <Route path="/training/payment/success" element={<TrainingPaymentSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
