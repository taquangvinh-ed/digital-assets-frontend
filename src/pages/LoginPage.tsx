import AuthCard from "../features/auth/components/AuthCard";
import LoginForm from "../features/auth/components/LoginForm";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {

const handleLogin = ()=>{

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