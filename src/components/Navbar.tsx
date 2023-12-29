import { px } from "@/utils/units";
import {
  Box,
  Breakpoint,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
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
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button color="secondary">{"PoS Dashboard"}</Button>
            </Link>
            <Link href="/incidents" style={{ textDecoration: "none" }}>
              <Button color="secondary">{"Incidents"}</Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
