import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button data-cy="login-btn" type="button" className="btn btn-auth px-3 text-qhali" onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
};

export default LoginButton;
