import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './Pages/HomePage/HomePage';
import { ServicesPage } from './Pages/ServicePage/ServicePage';
import { ServiceDetailsPage } from './Pages/ServiceDeatilsPage/ServiceDetailsPage';
import { ConsultationPage } from './Pages/ConsultationPage/ConsultationPage';
import { AboutPage } from './Pages/AboutPage/AboutPage';
import { InsightsPage } from './Pages/InsightsPage/InsightsPage';

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
      </Route>
    </Routes>
  );
}

export default App;
