import AuthCard from "../features/auth/components/AuthCard";
import LoginForm from "../features/auth/components/LoginForm";
import AuthLayout from "../layouts/AuthLayout";
import type { LoginData } from "../types/LoginData";

const LoginPage = () => {

const handleLogin = (loginData: LoginData)=>{

}

  return (
  <AuthLayout>
    <AuthCard title="Đăng nhập" description="Chào mừng bạn quay trở lại">
      <LoginForm onSubmit={handleLogin}/>
    </AuthCard>
  </AuthLayout>
);
}

export default LoginPage