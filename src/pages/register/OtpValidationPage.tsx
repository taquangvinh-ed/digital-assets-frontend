import { useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../../features/auth/components/AuthCard";
import OtpValidationForm from "../../features/auth/components/OtpValidationForm";
import AuthLayout from "../../layouts/AuthLayout";

const OtpValidationPage = () => {
const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "người dùng";

  const handleVerifyOtp = (otp: string) => {
    console.log("Xác thực mã:", otp, "cho email:", email);
    // Nếu thành công, chuyển về login
    navigate('/login');
  };

  const handleResendOtpCode = ()=>{

  }
    return (
  <AuthLayout>
    <AuthCard title="Xác thực OTP" description="Vui lòng nhập mã 6 số đã được gửi qua Email">
      <OtpValidationForm email = {email} onVerify={handleVerifyOtp} onResend={handleResendOtpCode}/>
    </AuthCard>
  </AuthLayout>
);
}
export default OtpValidationPage


