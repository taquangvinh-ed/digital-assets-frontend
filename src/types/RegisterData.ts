import * as z from 'zod';


export const registerSchema = z.object({
  firstName: z.string().min(2, 'Tên phải từ 2 ký tự trở lên'),
  lastName: z.string().min(2, 'Họ phải từ 2 ký tự trở lên'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
  confirmPassword: z.string().min(6, 'Xác nhận mật khẩu phải từ 6 ký tự'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export type RegisterData = z.infer<typeof registerSchema>;