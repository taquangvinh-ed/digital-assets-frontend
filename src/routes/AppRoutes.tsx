import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import OtpValidationPage from '../pages/register/OtpValidationPage';
import RegisterPage from '../pages/register/RegisterPage';
import CesiumPage from '../pages/CesiumPage';


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Điều hướng mặc định vào Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Các trang Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpValidationPage />} />

        {/* Trang chính sau khi login (Ví dụ) */}
        <Route path="/dashboard" element={<div>Trang chủ Dashboard</div>} />

        <Route path="/cesium" element={<CesiumPage/>} />
      </Routes>
    </BrowserRouter>
  );
};