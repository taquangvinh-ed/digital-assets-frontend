// features/auth/components/AuthCard.tsx
import { Card, CardContent } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  title?: string;
}

const AuthCard: FC<AuthCardProps> = ({ children, title }) => {
  return (
    <Card className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-sm rounded-xl">
      <CardContent className="p-8">
        {title && (
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h1>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default AuthCard;