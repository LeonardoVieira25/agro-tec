import { Box, Typography } from '@mui/material';
import { DiscussionSelector } from '../DiscussionSelector';
import CourseSubmitting from '../DiscussionSubmitting';
import { useSubmission } from '../../hooks/useSubmission';

export const SelectDiscussion = () => {
  const { submission } = useSubmission();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '700px',
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 1 }}
      >
        Seja bem vindo(a) ao Agro Tech!
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'regular', fontSize: '1.125rem', mb: 2 }}
      >
        Antes de começar a postar e reagir aos posts, selecione a sua área de
        discussão. Caso não a encontre, você pode submetê-la no botão abaixo.
      </Typography>
      {!submission && <DiscussionSelector />}
      <CourseSubmitting />
    </Box>
  );
};
