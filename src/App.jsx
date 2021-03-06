import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* import Layout from "./pages/Home/layout"; */
import ScrollToTop from './hooks/ScrollToTop';
import './App.scss';
import Home from './pages/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import Affiliations from './components/Affiliations';
import ServiceDetails from './components/ServiceDetails';
import Layout from './pages/Layout';
import Feedback from './components/Feedback';
import ListingsPage from './components/Chat/ListingsPage';
import DetailsPage from './components/Chat/DetailsPage';
import ChatsPage from './components/Chat/ChatsPage';
import Profile from './components/Profile';
import MiPerfil from './components/Profile/MiPerfil';
import NewPassword from './components/Profile/ChangePassword';

const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="affiliations" element={<Affiliations />} />
          <Route
            path="/service-details/:name/:description/"
            element={<ServiceDetails />}
          />
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<MiPerfil />} />
            <Route path="change-password" element={<NewPassword />} />
          </Route>
          <Route path="contact-us" element={<Contact />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="near-med-center" element={<ListingsPage />} />
          <Route path="med-center/:id" element={<DetailsPage />} />
          <Route path="chats" element={<ChatsPage />} />
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);
export default App;
