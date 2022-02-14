/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (props) => {
  const { children } = props;
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

ScrollToTop.propTypes = {
  children: PropTypes.node,
};

ScrollToTop.defaultProps = {
  children: () => {},
};
export default ScrollToTop;
