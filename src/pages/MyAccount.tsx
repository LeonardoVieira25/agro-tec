import { Box, Typography } from "@mui/material";
import Layout from "../components/Layout/Index";
import { InputText } from "../components/MyAccount/InputText";
import { UserContainer } from "../components/UserContainer/Index";
import useDiscussions from "../hooks/useDiscussion";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

function MyAccount() {
  const { userDiscussion } = useDiscussions();
  const { user } = useFirebaseAuth();

  return (
    <>
      <Layout>
        <UserContainer user={user} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "4rem",
            width: "100%",
            maxWidth: "600px",
            marginBottom: 16,
          }}
        >
          <Box
            sx={{
              borderRadius: "8px",
              background: "#f4f4f4",
              p: "2rem",
              color: "#323238",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: "1rem",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "1.125rem",
              }}
            >
              SEUS DADOS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <InputText label="Nome" value={user?.displayName || ""} />
              <InputText label="Email" value={user?.email || ""} />
              <InputText
                label="Área de Discussão"
                value={userDiscussion?.nome || ""}
              />
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
export default MyAccount;
