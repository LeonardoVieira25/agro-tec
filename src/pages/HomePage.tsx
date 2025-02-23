import { Box, Button } from "@mui/material";
import { useState } from "react";
import Layout from "../components/Layout/Index";
import { CreatePost } from "../components/Posts/CreatePost";
import { PostScreen } from "../components/PostScreen/Index";
import PostsFeed from "../components/PostsFeed";
import { SelectDiscussion } from "../components/SelectDiscussion/Index";
import { UserContainer } from "../components/UserContainer/Index";
import useDiscussions from "../hooks/useDiscussion";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useUserData } from "../hooks/useUserData";
import { Post } from "../types/post";
import { Link } from "react-router-dom";

function HomePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { userDiscussion } = useDiscussions();
  const { userData } = useUserData();
  const { user } = useFirebaseAuth();

  return (
    <>
      <Layout>
        {user && <UserContainer user={user} />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            mt: "4rem",
            marginBottom: 16,
          }}
        >
          {userDiscussion ? (
            <>
              {!selectedPost ? (
                <>
                  <CreatePost />
                  {userData?.firebaseData && (
                    <PostsFeed
                      actions={[
                        (post) => (
                          <Box>
                            <Button
                              variant="contained"
                              onClick={() => setSelectedPost(post)}
                            >
                              Ver respostas
                            </Button>
                          </Box>
                        ),
                      ]}
                    />
                  )}
                </>
              ) : (
                <PostScreen
                  post={selectedPost}
                  onBack={() => setSelectedPost(null)}
                />
              )}
            </>
          ) : (
            <SelectDiscussion />
          )}
          <div>
            <Link to="/steps">Go to Steps Page</Link>
          </div>
        </Box>
      </Layout>
      );
    </>
  );
}
export default HomePage;
