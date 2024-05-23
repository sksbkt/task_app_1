"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

export default function UserCard({ user }: { user: UserProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: { lg: "70%", sx: "100%" }, margin: "1.5rem" }}>
        <CardHeader
          avatar={
            <Avatar
              src={user.avatar}
              sx={{
                bgcolor: red[500],
                width: { lg: 200, sm: 80 },
                height: { lg: 200, sm: 80 },
              }}
              alt={user.first_name}
              aria-label="recipe"
            />
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => alert("Api does support DELETE method")}
            >
              <DeleteIcon />
            </IconButton>
          }
          title={`${user.first_name} ${user.last_name}`}
          subheader={user.email}
        />

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit
            amet.., comes from a line in section 1.10.32.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
