import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Typography,
  Box,
  Fade,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterData } from '../../../types/RegisterData';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  isLoading?: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fcfcfd',
      transition: '0.3s',
      '&:hover fieldset': { borderColor: '#3b82f6' },
      '&.Mui-focused fieldset': { borderWidth: '2px' }
    },
  };

  return (
    <Box className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Fade in={!!error}>
            <Alert severity="error" variant="filled" className="rounded-xl shadow-sm">
              {error}
            </Alert>
          </Fade>
        )}

        <div className="flex flex-col gap-5">
          {/* Hàng Họ và Tên */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              {...register('lastName')}
              label="Họ"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyle}
            />
            <TextField
              {...register('firstName')}
              label="Tên"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={textFieldStyle}
            />
          </div>

          {/* Email */}
          <TextField
            {...register('email')}
            label="Địa chỉ Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          {/* Password */}
          <TextField
            {...register('password')}
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          {/* Confirm Password */}
          <TextField
            {...register('confirmPassword')}
            label="Xác nhận mật khẩu"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
        </div>

        {/* Submit Button */}
        <Box className="pt-2">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            className={`py-4 rounded-xl capitalize text-lg font-bold shadow-lg transition-all
              ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-100'}
            `}
            sx={{ textTransform: 'none' }}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <CircularProgress size={20} color="inherit" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              'Đăng ký tài khoản'
            )}
          </Button>
        </Box>

        {/* Chuyển hướng về Login */}
        <Typography variant="body2" align="center" className="mt-4">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-emerald-600 font-bold hover:underline transition-colors">
            Đăng nhập ngay
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default RegisterForm;