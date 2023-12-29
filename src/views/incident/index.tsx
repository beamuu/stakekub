import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Warns } from "./components/Warns";

export const IncidentPage: FC = () => {
  return (
    <Container maxWidth="xl" sx={{
      py: 3,
      minHeight: "96vh",
    }}>
      <Grid container>
        <Grid xs={12} sm={12} md={6}>
          <Warns />
        </Grid>
      </Grid>
    </Container>
  );
};
