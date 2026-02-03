import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, Fade, CircularProgress } from '@mui/material';

interface OtpFormProps {
  email: string;
  isLoading?: boolean;
  onVerify: (otp: string) => void;
  onResend: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ email, isLoading, onVerify, onResend }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Hàm xử lý khi nhập số
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value.substring(element.value.length - 1);
    setOtp(newOtp);

    // Tự động nhảy sang ô tiếp theo
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Hàm xử lý khi nhấn Backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Hàm xử lý Paste (Dán mã)
  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, 6).split("");
    if (data.length === 6 && data.every(char => !isNaN(Number(char)))) {
      setOtp(data);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      onVerify(otpString);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Box className="flex flex-col items-center">
        <Typography variant="body1" className="text-gray-500 mb-6 text-center">
          Mã xác thực đã được gửi đến <br />
          <span className="font-bold text-slate-800">{email}</span>
        </Typography>

        {/* Cụm ô nhập OTP */}
        <Box className="flex gap-2 sm:gap-4 justify-center" onPaste={handlePaste}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => { inputRefs.current[index] = el; }}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl bg-gray-50/50 outline-none transition-all
                         focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100
                         border-gray-200 text-slate-800"
            />
          ))}
        </Box>
      </Box>

      <div className="space-y-4">
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading || otp.join("").length < 6}
          className={`py-4 rounded-xl text-lg font-bold shadow-lg transition-all
            ${isLoading ? 'bg-gray-300' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'}
          `}
          sx={{ textTransform: 'none' }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Xác nhận mã'}
        </Button>

        <Box className="text-center">
          <Typography variant="body2" className="text-gray-500">
            Bạn chưa nhận được mã?{' '}
            <button
              type="button"
              onClick={onResend}
              className="text-indigo-600 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Gửi lại ngay
            </button>
          </Typography>
        </Box>
      </div>
    </form>
  );
};

export default OtpForm;