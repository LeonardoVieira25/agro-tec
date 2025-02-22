import { Avatar, Box, Typography } from "@mui/material";
import { User } from "firebase/auth";

export function UserCard({ user }: { user: User | null }) {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2
      }}>
        <Avatar alt={user?.displayName ?? "Você não esta logado"} src={user?.photoURL ?? ""} />
        <Typography variant="h6">{user?.displayName || "Você não esta logado"}</Typography>
      </Box>
    );
  }
  