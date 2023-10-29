import { Box, Card, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface BlockCardProps {
  spanBlock: SpanBlock;
  validatorInfo: ValidatorInfo | null;
  next?: boolean;
}

const colors = {
  blockNotPropagated: {
    bg: "",
    text: "",
  },
  blockMissed: {
    bg: "#ff2450",
    text: "#ffffff",
  },
  blockCurrentlyWaiting: {
    bg: "#f2b40a",
    text: "text.primary",
  },
  blockPropagated: {
    bg: "#72d113",
    text: "#ffffff",
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
      : "https://s2.coinmarketcap.com/static/img/coins/200x200/16093.png";
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
  return (
    <Grid item xs={12} sm={4} md={3} lg={12 / 5}>
      <Link href={`https://bkcscan.com/block/${spanBlock.blockNumber}`} style={{
        textDecoration: "none"
      }}>
        <Paper
          elevation={0}
          sx={{
            p: "10px",
            backgroundColor: bg,
            color: text,
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
                  width: "30px",
                  height: "30px",
                  borderRadius: "6px",
                }}
                src={getProfileImage()}
              />
              <Typography fontWeight={600} fontSize={12} color="inherit">
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
        </Paper>
      </Link>
    </Grid>
  );
};
