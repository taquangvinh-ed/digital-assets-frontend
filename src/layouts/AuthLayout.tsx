import { Box } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box 
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4"
      sx={{
        backgroundImage: `url('/src/assets/images/global-city.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

      {/* Logo chính của App nằm trên Card */}
      <div className="relative z-10 mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
          DIGITAL<span className="text-blue-400">ASSETS</span>
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {children}
      </div>
    </Box>
  );
};

export default AuthLayout;