import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Modal,
  Paper,
  Portal,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useSubmission } from '../hooks/useSubmission';
import { Discussion } from '../types/discussion';
import DiscussionSubmittedCard from './DiscussionSubmittedCard';

export default function CourseSubmitting() {
  const { submission, deleteSubmission } = useSubmission();

  const { user } = useFirebaseAuth();

  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'semibold',
            fontSize: '18px',
            mb: 4,
          }}
        >
          Parece que você ainda não fez login
        </Typography>
        <Button
          onClick={() => (window.location.href = '/login')}
          variant="contained"
        >
          Entrar
        </Button>
      </Box>
    );
  }

  if (submission) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flex: 1,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontSize: '1.5rem', fontWeight: '600', mb: 1 }}
          >
            Curso submetido
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '1rem', fontWeight: 'medium' }}
          >
            Seu discussão foi enviado com sucesso! Aguarde a aprovação.
          </Typography>
        </Box>
        <DiscussionSubmittedCard discussion={submission} />
        <Button
          onClick={() => {
            deleteSubmission(user);
          }}
          variant="contained"
          endIcon={<Delete />}
          color="error"
          sx={{ borderRadius: '6px', width: 'fit-content' }}
        >
          Cancelar envio
        </Button>
      </Box>
    );
  }
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontSize: '1.25rem', fontWeight: '600', mt: 5, mb: 3 }}
      >
        Não encontrou seu discussão?
      </Typography>
      <Button
        onClick={() => {
          setSubmitting(true);
        }}
        variant="contained"
      >
        Submeter discussão
      </Button>
      <CourseSubmitPopUp open={submitting} setOpen={setSubmitting} />
    </Box>
  );
}

function CourseSubmitPopUp({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [discussion, setCourse] = useState<Discussion>({
    code: '',
    nome: '',
    universityCode: undefined,
  });
  const { user } = useFirebaseAuth();
  const { submitCourse } = useSubmission();

  return (
    <Portal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 4,
            background: '#2E2E2E',
            color: '#f2f2f2',
            minWidth: '400px',
          }}
        >
          {user ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Submeter discussão
              </Typography>

              <TextField
                label="Código"
                onChange={(e) =>
                  setCourse((prev) => ({ ...prev, code: e.target.value }))
                }
                sx={{
                  borderRadius: '6px',
                  color: '#f2f2f2',
                  label: {
                    color: '#f2f2f2',
                  },
                  input: {
                    color: '#f2f2f2',
                  },
                  fieldset: {
                    borderRadius: '6px',
                    borderColor: '#f2f2f2',
                  },
                  '&.Mui-focused': {
                    borderColor: '#4285F4',
                    outline: '2px solid #4285F4',
                  },
                  '&:hover': {
                    fieldset: {
                      borderColor: '#4285F4',
                    },
                  },
                }}
              />
              <TextField
                label="Nome"
                onChange={(e) =>
                  setCourse((prev) => ({ ...prev, nome: e.target.value }))
                }
                sx={{
                  borderRadius: '6px',
                  color: '#f2f2f2',
                  label: {
                    color: '#f2f2f2',
                  },
                  input: {
                    color: '#f2f2f2',
                  },
                  fieldset: {
                    borderRadius: '6px',
                    borderColor: '#f2f2f2',
                  },
                  '&.Mui-focused': {
                    borderColor: '#4285F4',
                    outline: '2px solid #4285F4',
                  },
                  '&:hover': {
                    fieldset: {
                      borderColor: '#4285F4',
                    },
                  },
                }}
              />

              <Button
                onClick={() => {
                  submitCourse(user, discussion);
                  setOpen(false);
                }}
                sx={{ borderRadius: '6px' }}
                variant="contained"
              >
                Submeter
              </Button>

              <Button
                onClick={() => {
                  setOpen(false);
                }}
                sx={{ borderRadius: '6px' }}
                variant="outlined"
                color="error"
              >
                Cancelar
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h3">
                Faça login para submeter um discussão
              </Typography>

              <Button>Entrar</Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                color="error"
              >
                Cancelar
              </Button>
            </Box>
          )}
        </Paper>
      </Modal>
    </Portal>
  );
}
