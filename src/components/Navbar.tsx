import { Box, Breakpoint, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  containerSize?: Breakpoint;
}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "100vw",
        backgroundColor: "background.default",
        zIndex: 999,
        borderWidth: "0 0 1px 0",
        borderColor: "divider",
        borderStyle: "solid",
      }}
    >
      <Container maxWidth={props.containerSize || "xl"} sx={{ py: "12px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              letterSpacing={6}
              fontSize={14}
              fontWeight={700}
              color="text.primary"
            >
              STAKEKUB
            </Typography>
          </Box>
          <Link
            href="https://staking.bitkubchain.com/"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" sx={{ borderRadius: "200px" }}>
              {"Official Website ->"}
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
