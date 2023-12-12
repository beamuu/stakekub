import { px } from "@/utils/units";
import { Box, Breakpoint, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  containerSize?: Breakpoint;
}

export const navbarHeight = 60;

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
      <Container maxWidth={props.containerSize || "xl"}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height={px(navbarHeight)}
        >
          <Box>
            <Typography
            letterSpacing="-0.03em"
              variant="h6"
              fontWeight={700}
              color="text.primary"
            >
              Stakekub
            </Typography>
          </Box>
          <Link
            href="https://staking.bitkubchain.com/"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained">
              {"Official Website ->"}
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
