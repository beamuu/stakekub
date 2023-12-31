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
import { useTranslation } from "next-i18next";

interface NavbarProps {
  containerSize?: Breakpoint;
}

export const navbarHeight = 60;

export const Navbar: FC<NavbarProps> = (props) => {
  const { t } = useTranslation("navbar");
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "100vw",
        backgroundColor: "background.paper",
        zIndex: 999,
        boxShadow: "0px 5px 20px 2px #000000e0"
        // borderWidth: "0 0 1px 0",
        // borderColor: "divider",
        // borderStyle: "solid",
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
              letterSpacing="6px"
              fontWeight={400}
              color="text.primary"
            >
              STAKE
              <Typography
                component="span"
                color="primary.main"
                fontWeight={600}
              >
                KUB
              </Typography>
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button color="secondary">{t("menu-pos-dashboard")}</Button>
            </Link>
            <Link href="/incidents" style={{ textDecoration: "none" }}>
              <Button color="secondary">{t("menu-incedents")}</Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
