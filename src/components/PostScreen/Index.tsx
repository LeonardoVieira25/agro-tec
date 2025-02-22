import { Box, Button } from '@mui/material';
import PostCard from '../PostCard';
import PostsFeed from '../PostsFeed';
import { Post } from '../../types/post';
import { CreatePost } from '../Posts/CreatePost';

interface PostScreenProps {
  post: Post;
  onBack: () => void;
}

export const PostScreen = ({ post, onBack }: PostScreenProps) => {
  if (!post) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 4,
        }}
      >
        <Box>
          <Button onClick={onBack}>Voltar</Button>
        </Box>
      </Box>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <PostCard post={post} actions={[]} />
      </Box>
      <PostsFeed parentPostId={post.doc.id} />
      <CreatePost parentPostId={post.doc.id} />

    </Box>
  );
};
