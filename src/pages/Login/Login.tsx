import { useNavigate } from 'react-router-dom';
import useLoginForm from './hook/useLoginForm';
import LoginBackground from './components/LoginBackground';
import LoginCard from './components/LoginCard';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const { formik, isPending } = useLoginForm();

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <LoginBackground>
      <LoginCard>
        <LoginHeader />
        <LoginForm formik={formik} isPending={isPending} onForgotPassword={handleForgotPassword} />
      </LoginCard>
    </LoginBackground>
  );
};

export default Login;
