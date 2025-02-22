import { Box, Button, Input } from '@mui/material';
import { useState } from 'react';
import usePosts from '../../hooks/usePosts';

interface CreatePostProps {
  parentPostId?: string;
}

export const CreatePost = ({ parentPostId }: CreatePostProps) => {
  const [newPostText, setNewPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { makePost } = usePosts(parentPostId);

  const handleMakeNewPost = () => {
    setIsLoading(true);
    setTimeout(() => {
      makePost(newPostText).then(() => {
        setNewPostText('');
        setIsLoading(false);
      });
    }, 1500);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        w: '100%',
        bgcolor: '#2E2E2E',
        p: '1.75rem',
        borderRadius: '6px',
      }}
    >
      <Input
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
        multiline
        minRows={8}
        placeholder="O que você deseja compartilhar?"
        aria-label="Make Post"
        sx={{
          bgcolor: '#1E1E1E',
          borderRadius: '6px',
          color: '#F2F2F2',
          border: '1px solid #1E1E1E',
          p: '0.5rem',
          mb: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 'regular',
          '&.Mui-focused': {
            borderColor: '#4285F4',
            outline: '2px solid #4285F4',
          },
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
        }}
      />

      <Button
        variant="contained"
        sx={{ maxWidth: '197px', width: '100%', alignSelf: 'flex-end' }}
        onClick={handleMakeNewPost}
        disabled={isLoading}
      >
        {isLoading ? 'Publicando...' : 'PUBLICAR'}
      </Button>
    </Box>
  );
};
