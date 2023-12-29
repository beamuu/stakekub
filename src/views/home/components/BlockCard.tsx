import { unknownProfileImage } from "@/constants/url";
import {
  Box,
  Card,
  Chip,
  Grid,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FC } from "react";
import { shortenAddress, shortenText } from "@/utils/string";
import { px } from "@/utils/units";

interface BlockCardProps {
  spanBlock: SpanBlock;
  validatorInfo: ValidatorInfo | null;
  next?: boolean;
}

const colors = {
  blockNotPropagated: {
    bg: "grey.100",
    text: "text.primary",
  },
  blockMissed: {
    bg: "#ff2450",
    text: "#ffffff",
  },
  blockCurrentlyWaiting: {
    bg: "primary.main",
    text: "primary.contrastText",
  },
  blockPropagated: {
    bg: "background.default",
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
      : shortenAddress(spanBlock.validator);
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
  const mined = spanBlock.status.difficulty != 0;
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
        borderColor: "divider",
      }}
    >
      <LinkWrapper
        href={`https://bkcscan.com/block/${spanBlock.blockNumber}`}
        enabled={mined}
      >
        <Box
          sx={{
            p: "8px",
            opacity: mined || next ? 1 : 0.3,
            backgroundColor: bg,
            color: text,
            transition: "300ms ease",
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
              <Box>
                <Typography fontWeight={500} fontSize={12} color="inherit">
                  <strong>{getProfileName()}</strong>
                </Typography>
                <Typography fontSize={12} color="inherit" sx={{ opacity: 0.7 }}>
                  {`#${spanBlock.blockNumber.toLocaleString()}`}
                </Typography>
              </Box>
            </Stack>
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
