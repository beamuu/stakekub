import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { PageCard } from "./components/PageCard";

export const HomePage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: "50px",
      }}
    >
      {/* <Box maxWidth="800px" mb={4}>
        <Typography variant="h4">Analytics Tools</Typography>
      </Box> */}
      <Grid container spacing={2} my={5}>
        <Grid item xs={12} sm={6} md={4}>
          <PageCard
            title="Proof-of-Stake (PoS)"
            description="Live dashboard on Bitkub Chain consensus engine"
            href="/live"
            buttonText="Go to dashboard"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* <PageCard
            title="Stake Analytics"
            description="Live dashboard on Bitkub Chain consensus engine"
            href="analytics"
          /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
      </Grid>
    </Container>
  );
};
