import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button type="button" className="btn btn-qhali px-3 text-qhali" onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
};

export default LoginButton;
