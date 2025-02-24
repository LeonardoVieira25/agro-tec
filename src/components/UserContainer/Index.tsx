import { Avatar, Box, Button, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUniversityName } from '../../utils/university';
import { useUserData } from '../../hooks/useUserData';
import useDiscussions from '../../hooks/useDiscussion';

interface UserContainerProps {
  user: User | null;
}

export const UserContainer = ({ user }: UserContainerProps) => {
  const { setSelectedDiscussion } = useUserData();
  const { userDiscussion } = useDiscussions();

  const [userUniversity, setUserUniversity] = useState<string | null>(null);
  useEffect(() => {
    if (user) {
      setUserUniversity(getUniversityName(user));
    }
  }, [user]);

  async function handleChangeCourse() {
    await setSelectedDiscussion(null);
    window.location.href = '/';
  }
  return (
    <Box
      sx={{
        bgcolor: '#f4f4f4',
        borderRadius: '6px',
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 300,
        height: 'fit-content',
        minHeight: '500px',
        '@media(max-width: 600px)': {
          height: 'fit-content',
          minHeight: 'auto',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: '#428C5C',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
          height: '116px',
        }}
      ></Box>
      <Box
        sx={{
          borderRadius: '50%',
          outline: '5px solid #f4f4f4',
          marginTop: '-60px',
        }}
      >
        <Avatar
          alt={user?.displayName || 'User Avatar'}
          src={user?.photoURL || 'user.png'}
          sx={{
            width: '110px',
            height: '110px',
          }}
        />
      </Box>
      <Typography
        sx={{
          marginTop: '1rem',
          fontWeight: 'medium',
          fontSize: '1.125rem',
          textAlign: 'center',
          px: 2,
        }}
      >
        {user?.displayName}
      </Typography>
      {userUniversity && (
        <Typography
          sx={{
            marginTop: '0.5rem',
            fontWeight: 'light',
            fontSize: '1rem',
            textAlign: 'center',
            px: 2,
          }}
        >
          {userUniversity}
        </Typography>
      )}
      {userDiscussion && (
        <Typography
          sx={{
            marginTop: '0.25rem',
            fontWeight: 'light',
            fontSize: '0.75rem',
            color: '#ccc',
            textAlign: 'center',
            px: 2,
          }}
        >
          {userDiscussion.nome} - {userDiscussion.code}
        </Typography>
      )}
      {window.location.pathname === '/minhaconta' && (
        <Button onClick={handleChangeCourse}>
          Mudar minha área de discussão
        </Button>
      )}
      <Box
        sx={{
          width: '100%',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
          height: '50px',
        }}
      ></Box>
    </Box>
  );
};
