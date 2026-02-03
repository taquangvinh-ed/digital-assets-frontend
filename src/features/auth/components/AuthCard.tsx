import React from 'react';
import { Card, CardContent, Box, Typography, Fade } from '@mui/material';

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, description }) => {
  return (
    <Fade in timeout={600}>
      <Card 
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.88)', 
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
          {/* Header nằm bên trong Card */}
          {(title || description) && (
            <Box mb={4} textAlign="center">
              {title && (
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body2" sx={{ color: '#64748b', fontSize: '1rem' }}>
                  {description}
                </Typography>
              )}
            </Box>
          )}

          {children}
        </CardContent>
      </Card>
    </Fade>
  );
};

export default AuthCard;