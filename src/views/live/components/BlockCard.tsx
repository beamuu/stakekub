import { unknownProfileImage } from "@/constants/url";
import { Box, Card, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { FC } from "react";

interface BlockCardProps {
  spanBlock: SpanBlock;
  validatorInfo: ValidatorInfo | null;
  next?: boolean;
}

const colors = {
  blockNotPropagated: {
    bg: grey[200],
    text: "text.disabled",
  },
  blockMissed: {
    bg: "#ff2450",
    text: "#ffffff",
  },
  blockCurrentlyWaiting: {
    bg: "primary.main",
    text: "#ffffff",
  },
  blockPropagated: {
    bg: "background.paper",
    text: "text.primary",
  },
};

export const BlockCard: FC<BlockCardProps> = ({
  spanBlock,
  validatorInfo,
  next,
}) => {
  function getProfileImage() {
    return validatorInfo && validatorInfo.profile
      ? validatorInfo.profile.image
      : unknownProfileImage;
  }
  function getProfileName() {
    return validatorInfo && validatorInfo.profile
      ? validatorInfo.profile.name
      : spanBlock.validator;
  }
  function getStatusColor() {
    if (spanBlock.status.isProposed) {
      if (spanBlock.status.difficulty === 2n) {
        return colors.blockPropagated;
      } else if (spanBlock.status.difficulty === 1n) {
        return colors.blockMissed;
      }
    }
    if (next) {
      return colors.blockCurrentlyWaiting;
    }
    return colors.blockNotPropagated;
  }
  const { text, bg } = getStatusColor();
  const mined = spanBlock.status.difficulty != 0
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      lg={12 / 5}
      sx={{
        borderStyle: "solid",
        borderWidth: "0 1px 1px 0",
        borderColor: grey[300],
      }}
    >
      <LinkWrapper href={`https://bkcscan.com/block/${spanBlock.blockNumber}`} enabled={mined}>
        <Box
          sx={{
            px: "10px",
            py: "20px",
            backgroundColor: bg,
            color: text,
            transition: "300ms ease",
            "&:hover": mined ? {
              transform: "scale(1.03)",
              boxShadow: "0 1px 40px 10px #00000030",
            }: undefined,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              spacing={1}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="60%"
            >
              <img
                alt="val-profile-img"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "2px",
                }}
                src={getProfileImage()}
              />
              <Typography fontWeight={500} fontSize={14} color="inherit">
                {getProfileName()}
              </Typography>
            </Stack>
            <Box>
              <Chip
                label={`#${spanBlock.blockNumber}`}
                size="small"
                sx={{
                  fontWeight: 600,
                  color: "inherit",
                }}
              />
            </Box>
          </Stack>
        </Box>
      </LinkWrapper>
    </Grid>
  );
};

interface LinkWrapperProps {
  enabled?: boolean;
  href: string;
  children?: any;
}

const LinkWrapper: FC<LinkWrapperProps> = ({ enabled, href, children }) => {
  if (!enabled) {
    return children;
  }
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
};
