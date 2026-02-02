import { useNavigate } from 'react-router-dom';
import useResetPasswordForm from './hook/useResetPasswordForm';
import LoginBackground from '../Login/components/LoginBackground';
import LoginCard from '../Login/components/LoginCard';
import { ResetPasswordHeader, ResetPasswordForm } from './components';

const ResetPassword = () => {
  const { formik } = useResetPasswordForm();
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <LoginBackground>
      <LoginCard>
        <ResetPasswordHeader />
        <ResetPasswordForm formik={formik} onBackToLogin={handleBackToLogin} />
      </LoginCard>
    </LoginBackground>
  );
};

export default ResetPassword;
