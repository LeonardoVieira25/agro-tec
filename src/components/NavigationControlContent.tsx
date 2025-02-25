import { Box, Button, CircularProgress } from '@mui/material';
import { useLoadingContext } from '../context/loadingContext';
import useAdmin from '../hooks/useAdmin';
import useDiscussions from '../hooks/useDiscussion';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useUserData } from '../hooks/useUserData';
import DiscussionCard from './DiscussionCard';
import LoadingWarper from './LoaderWarper';
import { UserCard } from './UserCard';
import { Link } from 'react-router-dom';

export default function NavigationControlContent() {
  const { useAdmin: useAdminLoading } = useLoadingContext();

  const { user } = useFirebaseAuth();
  const { setSelectedDiscussion } = useUserData();

  const { isAdmin } = useAdmin();

  const { userDiscussion } = useDiscussions();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4,
      }}
    >
      <UserCard user={user} />
      {userDiscussion ? (
        <>
          <DiscussionCard discussion={userDiscussion} />
          <Button
            onClick={() =>
              setSelectedDiscussion(null).then(() => window.location.reload())
            }
          >
            Change Course
          </Button>
        </>
      ) : (
        <></>
      )}

      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>

      <LoadingWarper
        loaded={isAdmin ? <Link to="/admin">Admin</Link> : <></>}
        loading={<CircularProgress />}
        value={useAdminLoading.getIsAdmin}
      />
    </Box>
  );
}
