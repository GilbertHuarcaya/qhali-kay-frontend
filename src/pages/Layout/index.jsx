import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Last from '../../components/Last';
import './styles.scss';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navigation slide={location.pathname === '/'} color="#90d7ff" />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
      <Last />
    </>
  );
};
export default Layout;
