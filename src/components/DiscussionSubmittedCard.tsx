import { Box, Typography } from '@mui/material';
import { Discussion } from '../types/discussion';

export default function DiscussionSubmittedCard({
  discussion,
}: {
  discussion: Discussion;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        p: '0.75rem 1rem',
        background: '#f4f4f4',
        color: '#2e2e2e',
        borderRadius: '6px',
      }}
    >
      <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: '600' }}>
        {discussion.nome}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: '0.75rem', fontWeight: '300', color: '#2e2e2e' }}
      >
        cod: {discussion.code}
      </Typography>
    </Box>
  );
}
