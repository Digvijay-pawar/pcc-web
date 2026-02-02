import useForgotPasswordForm from "./hook/useForgotPasswordForm";
import LoginBackground from "../Login/components/LoginBackground";
import LoginCard from "../Login/components/LoginCard";
import { ForgotPasswordHeader, ForgotPasswordForm } from "./components";

const ForgotPassword = () => {
  const { formik, isPending } = useForgotPasswordForm();

  return (
    <LoginBackground>
      <LoginCard>
        <ForgotPasswordHeader />
        <ForgotPasswordForm formik={formik} isPending={isPending} />
      </LoginCard>
    </LoginBackground>
  );
};

export default ForgotPassword;
