import { Box, Button, Typography } from '@mui/material';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import Layout from '../components/Layout/Index';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const { loggedIn, login } = useFirebaseAuth();
  console.log(loggedIn);

  // if (loggedIn) {
  //   window.location.href = '/';
  // }

  return (
    <Layout>
      <Box
        maxWidth="sm"
        sx={{
          margin: '120px auto',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#323238',
          borderRadius: '6px',
        }}
      >
        {loggedIn ? (
          <>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'semibold',
                fontSize: '18px',
              }}
            >
              Seja bem-vindo(a) ao Open Class, você já esstá conectado em nossa
              plataforma, vá para a home para acessar as publicações
            </Typography>
            <Link
              to="/"
              style={{
                color: '#405DE6',
                marginTop: '1rem',
                fontSize: '18px',
                fontWeight: 'semibold',
                textDecoration: 'underline',
                fontFamily: 'Inter',
              }}
            >
              Ir para a home
            </Link>
          </>
        ) : (
          <>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'semibold',
                fontSize: '18px',
              }}
            >
              Seja bem-vindo(a) ao Open Class, realize seu login ou faça seu
              cadastro para acessar as publicações
            </Typography>
            <Button
              onClick={login}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '46px',
                marginTop: '2rem',
                backgroundColor: '#4285F4',
                color: '#f1f1f1',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: 'semibold',
                discussãor: 'pointer',
                gap: '0.5rem',
                transition: 'all ease-in-out 0.3s',
                '&:hover': {
                  filter: 'brightness(0.9)',
                  backgroundColor: '#4285F4',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: '2px',
                  bgcolor: '#fff',
                  borderRadius: '4px',
                }}
              >
                <img
                  src="/google-icon.png"
                  alt="Google icon"
                  style={{ width: '32px', height: '32px' }}
                />
              </Box>
              Entrar com Google
            </Button>
          </>
        )}
      </Box>
    </Layout>
  );
}
