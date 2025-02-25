import { Box, Typography } from '@mui/material';
import { Post } from '../types/post';
import usePosts from '../hooks/usePosts';
import PostCard from './PostCard';
import { useMemo, useState } from 'react';

export default function PostsFeed({
  parentPostId,
  actions,
}: {
  parentPostId?: string;
  actions?: ((Post: Post) => React.ReactNode)[];
}) {
  const { posts, userDiscussion } = usePosts(parentPostId);

  const [withScores, setWithScores] = useState<{
    [key in Post['doc']['id']]: number;
  }>();

  const withScoresSorted = useMemo(() => {
    if (!withScores) {
      return posts;
    }
    return posts.slice().sort((a, b) => {
      return withScores[b.doc.id] - withScores[a.doc.id];
    });
  }, [posts, withScores]);

  return (
    <Box sx={{ py: '3rem', maxWidth: '100%' }}>
      {parentPostId ? (
        <Typography
          variant="h4"
          sx={{ fontSize: '1.125rem', fontWeight: '600' }}
        >
          COMENTÁRIOS
        </Typography>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ fontSize: '1.5rem', fontWeight: '600' }}
          >
            PUBLICAÇÕES RECENTES
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: '1.125rem',
              color: '#1e1e1e',
              textTransform: 'uppercase',
            }}
          >
            {userDiscussion?.nome}
          </Typography>
        </>
      )}

      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {posts.length === 0 && (
          <Typography variant="body1">
            Esse post ainda não possui comentários
          </Typography>
        )}
        {withScoresSorted.map((post) => (
          <PostCard
            key={post.doc.id}
            post={post}
            actions={[...(actions || [])]}
            setScore={(postId, score) => {
              setWithScores((prev) => ({ ...prev, [postId]: score }));
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
