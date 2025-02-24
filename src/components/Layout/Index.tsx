import { Box, Container } from '@mui/material';
import Header from '../Header/Index';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#fff',
        color: '#1A1A1D',
      }}
    >
      <Header />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            position: 'relative',
            justifyContent: isMobile ? 'flex-start' : 'center',
            gap: 4,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
