import { Box, Typography } from '@mui/material';
import useDiscussions from '../hooks/useDiscussion';
import Layout from '../components/Layout/Index';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { UserContainer } from '../components/UserContainer/Index';
import { InputText } from '../components/MyAccount/InputText';
import { useEffect, useState } from 'react';
import { getUniversityName } from '../utils/university';

function MyAccount() {
  const { userCourse } = useDiscussions();
  const { user } = useFirebaseAuth();

  const [userUniversity, setUserUniversity] = useState<string | null>(null);
  useEffect(() => {
    if (user) {
      setUserUniversity(getUniversityName(user));
    }
  }, [user]);

  return (
    <>
      <Layout>
        <UserContainer user={user} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: '4rem',
            width: '100%',
            maxWidth: '600px',
            marginBottom: 16
          }}
        >
          <Box
            sx={{
              borderRadius: '8px',
              background: '#323238',
              p: '2rem',
              color: '#f2f2f2',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: '1rem',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '1.125rem',
              }}
            >
              SEUS DADOS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <InputText label="Nome" value={user?.displayName || ''} />
              <InputText label="Email" value={user?.email || ''} />
              <InputText label="Curso" value={userCourse?.nome || ''} />
              <InputText label="Universidade" value={userUniversity || ''} />
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
export default MyAccount;
