// features/auth/components/LoginPage.tsx
import { useState } from 'react';
import LoginForm from '../features/auth/components/LoginForm';
import AuthCard from '../features/auth/components/AuthCard';
import { Box, Typography } from '@mui/material';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const backgroundImageUrl = '/src/assets/images/global-city.jpg'; 

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    setError('');

    try {
      // Giả lập API call
      console.log('Login data:', data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container chính chứa hình nền
    <Box
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      sx={{
        // Sử dụng sx prop của MUI hoặc style inline để đặt background image
        backgroundImage: `url('${backgroundImageUrl}')`,
        // Fallback color nếu ảnh chưa tải kịp
        backgroundColor: '#1a1a2e',
      }}
    >
      {/* --- LỚP PHỦ MỜ (OVERLAY) --- */}
      {/* Lớp này cực kỳ quan trọng để làm tối hình nền, giúp chữ dễ đọc hơn. */}
      {/* Bạn có thể chỉnh độ đậm nhạt bằng cách thay đổi số sau dấu gạch chéo: bg-black/30, bg-black/70... */}
      <div className="absolute inset-0 bg-black/50 "></div>
{/* backdrop-blur-sm */}
      {/* --- NỘI DUNG CHÍNH (LOGO & FORM) --- */}
      {/* Cần relative và z-index cao hơn để nằm đè lên lớp phủ mờ */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo hoặc tên app */}
        <div className="mb-8 text-center">
          <Typography
            variant="h3"
            component="h1"
            className="font-bold text-white drop-shadow-lg"
            sx={{ fontWeight: 800, letterSpacing: '1px' }}
          >
            Digital Assets
          </Typography>
          <Typography variant="subtitle1" className="text-blue-200 mt-2">
            Quản lý tài sản số của bạn
          </Typography>
        </div>

        {/* Card chứa form đăng nhập */}
        <AuthCard title="Chào mừng trở lại">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        </AuthCard>
      </div>
    </Box>
  );
}