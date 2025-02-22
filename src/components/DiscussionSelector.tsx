import { Box, Typography } from '@mui/material';
import { useLoadingContext } from '../context/loadingContext';
import useDiscussions from '../hooks/useDiscussion';
import { useUserData } from '../hooks/useUserData';
import DiscussionCard from './DiscussionCard';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

export function DiscussionSelector() {
  const { useUserData: useUserDataLoading } = useLoadingContext();

  const { userData, setSelectedDiscussion } = useUserData();
  const { user } = useFirebaseAuth();

  const { userDiscussions } = useDiscussions();

  if (!user) return;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1,
      }}
    >
      {!useUserDataLoading.userData && (
        <>
          {!userData?.discussionCode && (
            <Typography
              variant="body1"
              sx={{ fontSize: '1.125rem', fontWeight: 'medium' }}
            >
              Selecione o tópico para discussão
            </Typography>
          )}
          <Box
            sx={{
              // display: 'grid',
              // gridTemplateColumns: 'repeat(3, 1fr)',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 2,
              maxHeight: '600px',
              overflowY: 'auto',
              p: '1rem',
              justifyContent: 'center',
            }}
          >
            {userDiscussions.map((discussion) => (
              <Box
                key={discussion.code}
                sx={{
                  width: 'fit-content',
                  // minWidth: 100,
                  // maxWidth: 150,
                  // flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#2E2E2E',
                  p: '1rem 1.5rem',
                  discussãor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all ease-in-out 0.2s',
                  '&:hover': {
                    boxShadow: '0px 0px 8px 4px rgba(64, 93, 230, 0.6)',
                  },
                }}
                onClick={() => setSelectedDiscussion(discussion)}
              >
                <DiscussionCard discussion={discussion} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
