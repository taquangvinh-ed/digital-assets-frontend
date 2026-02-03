
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
} from '@mui/icons-material';

const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Box className="w-full max-w-md mx-auto">
      {/* Tăng space-y từ 5 lên 7 để các nhóm phần tử thưa hơn */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {error && (
          <Fade in={!!error}>
            <Alert severity="error" variant="filled" className="rounded-xl shadow-sm">
              {error}
            </Alert>
          </Fade>
        )}

        <div className="flex flex-col gap-6"> {/* Bọc các field vào một div với gap riêng */}
          {/* Email Field */}
          <TextField
            {...register('email')}
            label="Địa chỉ Email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" color={errors.email ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#fcfcfd',
                transition: '0.3s',
                '&:hover fieldset': { borderColor: '#3b82f6' },
                '&.Mui-focused fieldset': { borderWidth: '2px' }
              },
            }}
          />

          {/* Password Field Group */}
          <div className="space-y-1.5">
            <TextField
              {...register('password')}
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined fontSize="small" color={errors.password ? 'error' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#fcfcfd',
                  transition: '0.3s',
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderWidth: '2px' }
                },
              }}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="text"
                size="small"
                className="hover:bg-blue-50"
                sx={{ textTransform: 'none', fontWeight: 600, color: '#4f46e5' }}
              >
                Quên mật khẩu?
              </Button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Box className="pt-2">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            className={`
              py-4 rounded-xl capitalize text-lg font-bold shadow-lg transition-all duration-300
              ${isLoading ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}
            `}
            sx={{
              boxShadow: isLoading ? 'none' : '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
              textTransform: 'none',
              '&.Mui-disabled': { backgroundColor: '#e5e7eb', color: '#9ca3af' }
            }}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <CircularProgress size={20} color="inherit" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </Box>

        <Typography variant="body2" align="center" className="text-gray-500">
          Chưa có tài khoản?{' '}
          <span className="text-blue-600 font-bold cursor-pointer hover:text-blue-800 transition-colors">
            Tạo tài khoản mới
          </span>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;