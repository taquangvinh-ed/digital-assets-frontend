import { useNavigate } from "react-router-dom";
import AuthCard from "../../features/auth/components/AuthCard";
import RegisterForm from "../../features/auth/components/RegisterForm";
import AuthLayout from "../../layouts/AuthLayout";

const RegisterPage = () => {
const navigate = useNavigate();

const handleRegister = (data: any)=>{
    navigate('/verify-otp', { state: { email: data.email } });
}

    return (
  <AuthLayout>
    <AuthCard title="Tạo tài khoản" description="Bắt đầu quản lý tài sản số của bạn">
      <RegisterForm onSubmit={handleRegister}/>
    </AuthCard>
  </AuthLayout>
);

}
export default RegisterPage