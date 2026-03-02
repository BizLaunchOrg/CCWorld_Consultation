import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './Pages/HomePage/HomePage';
import { ServicesPage } from './Pages/ServicePage/ServicePage';
import { ServiceDetailsPage } from './Pages/ServiceDeatilsPage/ServiceDetailsPage';
import { ConsultationPage } from './Pages/ConsultationPage/ConsultationPage';
import { AboutPage } from './Pages/AboutPage/AboutPage';
import { InsightsPage } from './Pages/InsightsPage/InsightsPage';
import { TrainingPage } from './Pages/TrainingPage/TrainingPage';
import { TrainingDetailsPage } from './Pages/TrainingDetailsPage/TrainingDetailsPage';
import { TrainingCheckoutPage } from './Pages/TrainingCheckoutPage/TrainingCheckoutPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/training/:slug" element={<TrainingDetailsPage />} />
      <Route path="/checkout/training/:slug" element={<TrainingCheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
