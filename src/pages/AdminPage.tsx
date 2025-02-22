import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import Layout from '../components/Layout/Index';
import useAdmin from '../hooks/useAdmin';
import { useEffect, useState } from 'react';
import { University } from '../types/university';
import useDiscussions from '../hooks/useDiscussion';
import { Discussion } from '../types/discussion';
import usePosts from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import { Delete } from '@mui/icons-material';
import { getUniversityNameByCode } from '../utils/university';
import { useLoadingContext } from '../context/loadingContext';

export default function AdminPage() {
  const {
    useAdmin: useAdminLoading,
  } = useLoadingContext();
  const adminHook = useAdmin();
  const {
    isAdmin,
    submittedCourses,
    aproveCourse,
    rejectCourse,
    universities,
  } = adminHook;

  const [selectedUniversity, setSelectedUniversity] = useState<University>();

  if(useAdminLoading.getIsAdmin) {
    return (
      <Layout>
        <Box
          sx={{
            py: '3rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'medium', fontSize: '1rem' }}
          >
            Carregando...
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <Box
          sx={{
            py: '3rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'medium', fontSize: '1rem' }}
          >
            Você não tem permissão para acessar esta página
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (selectedUniversity) {
    return (
      <Layout>
        <UniversityScreen
          selectedUniversity={selectedUniversity}
          exit={() => setSelectedUniversity(undefined)}
          adminHook={adminHook}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ py: '3rem', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 8,
            width: '100%',
            justifyContent: 'center',
            '@media(max-width: 600px)': {
              flexDirection: 'column',
              gap: 4,
            },
          }}
        >
          <Box
            sx={{
              background: '#2E2E2E',
              p: '1rem',
              borderRadius: '6px',
              maxWidth: '50%',
              width: 'calc(100% - 16px)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                mb: 3,
                textAlign: 'center',
              }}
            >
              Cursos submetidos para aprovação
            </Typography>
            {submittedCourses.length > 0 ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  {submittedCourses.map((discussion) => (
                    <Card
                      key={discussion.code}
                      sx={{ backgroundColor: '#1E1E1E', color: '#f2f2f2' }}
                    >
                      <CardHeader title={discussion.nome} />
                      <CardContent>
                        <Typography
                          sx={{
                            fontSize: '1.125rem',
                            textTransform: 'uppercase',
                          }}
                        >
                          {discussion.universityCode}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            color: '#ccc',
                          }}
                        >
                          {discussion.code}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => aproveCourse(discussion)}
                        >
                          Aprovar
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => rejectCourse(discussion)}
                        >
                          Rejeitar
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              </>
            ) : (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'medium',
                  fontSize: '1rem',
                  mt: 3,
                  textAlign: 'center',
                }}
              >
                Não há discussãos submetidos para aprovação
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              background: '#2E2E2E',
              p: '1rem',
              borderRadius: '6px',
              maxWidth: '50%',
              width: 'calc(100% - 16px)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                mb: 3,
                textAlign: 'center',
              }}
            >
              Universidades registradas
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
              }}
            >
              {universities.map((university) => (
                <Button
                  key={university.name}
                  onClick={() => setSelectedUniversity(university)}
                  variant="contained"
                >
                  <CardHeader
                    title={getUniversityNameByCode(university.doc.id)}
                    subheader={university.doc.id}
                  />
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

function UniversityScreen({
  selectedUniversity,
  exit,
  adminHook,
}: {
  selectedUniversity: University;
  exit: () => void;
  adminHook: ReturnType<typeof useAdmin>;
}) {
  const { deleteCourse } = adminHook;

  const { getDiscussions } = useDiscussions();

  const [discussions, setCourses] = useState<Discussion[]>([]);

  const [selectedCourse, setSelectedDiscussion] = useState<Discussion>();

  useEffect(() => {
    getDiscussions(selectedUniversity.name).then((discussions) => setCourses(discussions));
  }, [selectedUniversity]);

  if (selectedCourse) {
    return (
      <CourseScreen
        selectedCourse={selectedCourse}
        selectedUniversity={selectedUniversity}
        exit={() => setSelectedDiscussion(undefined)}
        adminHook={adminHook}
      />
    );
  }

  return (
    <Box sx={{ py: '3rem' }}>
      <Button onClick={exit}>Voltar</Button>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          mb: 3,
          textAlign: 'center',
        }}
      >
        {getUniversityNameByCode(selectedUniversity.name)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          py: 4,
          justifyContent: 'center',
        }}
      >
        {discussions.map((discussion) => (
          <Card
            key={discussion.code}
            sx={{ backgroundColor: '#1E1E1E', color: '#f2f2f2' }}
          >
            <CardHeader title={discussion.nome} />
            <CardContent>
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: '#ccc',
                }}
              >
                {discussion.universityCode}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: '#ccc',
                }}
              >
                {discussion.code}
              </Typography>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setSelectedDiscussion(discussion)}
                >
                  Ver Posts
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    deleteCourse(discussion).then(() =>
                      getDiscussions(selectedUniversity.name).then((discussions) =>
                        setCourses(discussions)
                      )
                    )
                  }
                >
                  Deletar
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

function CourseScreen({
  selectedCourse,
  selectedUniversity,
  exit,
  adminHook,
}: {
  selectedCourse: Discussion;
  selectedUniversity: University;
  exit: () => void;
  adminHook: ReturnType<typeof useAdmin>;
}) {
  const { posts } = usePosts(
    undefined,
    selectedUniversity.name,
    selectedCourse.code
  );
  const { deletePost } = adminHook;

  return (
    <Box sx={{ width: '100%', py: '3rem' }}>
      <Button onClick={exit}>Voltar</Button>
      <Box
        sx={{
          py: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: '2rem',
            mb: 3,
            textAlign: 'center',
          }}
        >
          {selectedCourse.nome}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'medium',
              fontSize: '1.125rem',
              color: '#ccc',
              textAlign: 'center',
            }}
          >
            {getUniversityNameByCode(selectedUniversity.doc.id)}
          </Typography>
          -
          <Typography
            sx={{
              fontWeight: 'medium',
              fontSize: '1rem',
              color: '#ccc',
              textAlign: 'center',
            }}
          >
            {selectedCourse.code}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {posts.map((post) => (
          <PostCard
            key={post.doc.id}
            post={post}
            actions={[
              () => (
                <Button onClick={() => deletePost(post)}>
                  <Delete />
                </Button>
              ),
            ]}
          />
        ))}
      </Box>
    </Box>
  );
}
