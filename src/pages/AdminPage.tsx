import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Index";
import PostCard from "../components/PostCard";
import { useLoadingContext } from "../context/loadingContext";
import useAdmin from "../hooks/useAdmin";
import useDiscussions from "../hooks/useDiscussion";
import usePosts from "../hooks/usePosts";
import { Discussion } from "../types/discussion";

export default function AdminPage() {
  const { useAdmin: useAdminLoading } = useLoadingContext();
  const adminHook = useAdmin();
  const { isAdmin, submittedDiscussion, aproveDiscussion, rejectCourse } =
    adminHook;

  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const { getDiscussions } = useDiscussions();

  useEffect(() => {
    if (!isAdmin) return;

    getDiscussions().then(setDiscussions);
  }, [isAdmin]);

  if (useAdminLoading.getIsAdmin) {
    return (
      <Layout>
        <Box
          sx={{
            py: "3rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "medium", fontSize: "1rem" }}
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
            py: "3rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "medium", fontSize: "1rem" }}
          >
            Você não tem permissão para acessar esta página
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (selectedDiscussion) {
    return (
      <Layout>
        <DiscussionsScreen
          exit={() => setSelectedDiscussion(undefined)}
          adminHook={adminHook}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ py: "3rem", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 8,
            width: "100%",
            justifyContent: "center",
            "@media(max-width: 600px)": {
              flexDirection: "column",
              gap: 4,
            },
          }}
        >
          <Box
            sx={{
              background: "#f4f4f4",
              p: "1rem",
              borderRadius: "6px",
              maxWidth: "50%",
              width: "calc(100% - 16px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 3,
                textAlign: "center",
              }}
            >
              Áreas de discussão submetidas para aprovação
            </Typography>
            {submittedDiscussion.length > 0 ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {submittedDiscussion.map((discussion) => (
                    <Card
                      key={discussion.code}
                      sx={{ backgroundColor: "#ccc", color: "#2e2e2e" }}
                    >
                      <CardHeader title={discussion.nome} />
                      <CardContent>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            color: "#2e2e2e",
                          }}
                        >
                          {discussion.code}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => aproveDiscussion(discussion)}
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
                  fontWeight: "medium",
                  fontSize: "1rem",
                  mt: 3,
                  textAlign: "center",
                }}
              >
                Não há discussãos submetidos para aprovação
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              background: "#f4f4f4",
              p: "1rem",
              borderRadius: "6px",
              maxWidth: "50%",
              width: "calc(100% - 16px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 3,
                textAlign: "center",
              }}
            >
              Discussões registradas
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
              }}
            >
              {discussions.map((discussion) => (
                <Button
                  key={discussion.code}
                  onClick={() => setSelectedDiscussion(discussion)}
                  variant="contained"
                >
                  <CardHeader
                    title={discussion.nome}
                    subheader={discussion.code}
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

function DiscussionsScreen({
  exit,
  adminHook,
}: {
  exit: () => void;
  adminHook: ReturnType<typeof useAdmin>;
}) {
  const { deleteDiscussion } = adminHook;

  const { getDiscussions } = useDiscussions();

  const [discussions, setCourses] = useState<Discussion[]>([]);

  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion>();

  useEffect(() => {
    getDiscussions().then((discussions) => setCourses(discussions));
  }, [selectedDiscussion]);

  if (selectedDiscussion) {
    return (
      <DiscussionScreen
        selectedDiscussion={selectedDiscussion}
        exit={() => setSelectedDiscussion(undefined)}
        adminHook={adminHook}
      />
    );
  }

  return (
    <Box sx={{ py: "3rem" }}>
      <Button onClick={exit}>Voltar</Button>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          py: 4,
          justifyContent: "center",
        }}
      >
        {discussions.map((discussion) => (
          <Card key={discussion.code}>
            <CardHeader title={discussion.nome} subheader={discussion.code} />
            <CardContent>
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
                    deleteDiscussion(discussion).then(() =>
                      getDiscussions().then((discussions) =>
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

function DiscussionScreen({
  selectedDiscussion,
  exit,
  adminHook,
}: {
  selectedDiscussion: Discussion;
  exit: () => void;
  adminHook: ReturnType<typeof useAdmin>;
}) {
  const { posts } = usePosts(undefined, selectedDiscussion.code);
  const { deletePost } = adminHook;

  return (
    <Box sx={{ width: "100%", py: "3rem" }}>
      <Button onClick={exit}>Voltar</Button>
      <Box
        sx={{
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "medium",
              fontSize: "1.125rem",
              textAlign: "center",
            }}
          >
            {selectedDiscussion.nome}
          </Typography>
          -
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {selectedDiscussion.code}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
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
