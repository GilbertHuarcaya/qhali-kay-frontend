import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* import Layout from "./pages/Home/layout"; */
import ScrollToTop from './hooks/ScrollToTop';
import './App.scss';
import Home from './pages/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Doctor from './components/Doctor';
import Services from './components/Services';
import ServiceDetails from './components/ServiceDetails';
import Layout from './pages/Layout';

import ListingsPage from './components/Chat/ListingsPage';
import DetailsPage from './components/Chat/DetailsPage';
import ChatsPage from './components/Chat/ChatsPage';

const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route
            path="/service-details/:name/:description/"
            element={<ServiceDetails />}
          />
          <Route path="doctors" element={<Doctor />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="chat" element={<ListingsPage />} />
          <Route path="product/:id" element={<DetailsPage />} />
          <Route path="chats" element={<ChatsPage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);
export default App;
