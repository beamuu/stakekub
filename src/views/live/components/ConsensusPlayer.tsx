import { unknownProfileImage } from "@/constants/url";
import { useCoreData } from "@/contexts/core/core";
import { useSpan } from "@/contexts/span";
import { shortenAddress } from "@/utils/string";
import {
  Box,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

export const ConsensusPlayer = () => {
  const { currentBlockNumber } = useCoreData();
  const { getSpanBlock, spanSize } = useSpan();

  function previewBlocks() {
    const bs: (SpanBlock | null)[] = [];
    let b = getSpanBlock(BigInt(currentBlockNumber));
    bs.push(b);
    b = getSpanBlock(BigInt(currentBlockNumber + 1));
    bs.push(b);
    b = getSpanBlock(BigInt(currentBlockNumber + 2));
    bs.push(b);
    return bs;
  }

  function calculateProgress() {
    if (spanSize === 0n) {
      return 0;
    }
    let mod = BigInt(currentBlockNumber) % spanSize;
    let modInt = parseInt(mod.toString());
    let spanSizeInt = parseInt(spanSize.toString());
    return (modInt / spanSizeInt) * 100;
  }

  const previews = previewBlocks();
  const progress = calculateProgress();

  return (
    <Container maxWidth="xs">
      <Stack spacing={1} minHeight="200px">
        <PreviewCard spanBlock={previews[0]} index={0} />
        <PreviewCard spanBlock={previews[1]} index={1} />
        <PreviewCard spanBlock={previews[2]} index={2} />
      </Stack>
      <Stack alignItems="center" my={5} spacing={2}>
        <Box width="100%">
          <LinearProgress
            color="primary"
            variant="determinate"
            value={progress}
            sx={{
              borderRadius: "20px",
              height: "6px",
            }}
          />
        </Box>
        <Chip
          sx={{
            fontSize: 16,
            fontWeight: 700,
          }}
          label={
            spanSize !== 0n
              ? `${(BigInt(currentBlockNumber) % spanSize) + 1n}/${spanSize}`
              : ""
          }
        />
      </Stack>
    </Container>
  );
};

interface PreviewCardProps {
  spanBlock?: SpanBlock | null;
  index: number;
}

const PreviewCard: FC<PreviewCardProps> = ({ spanBlock, index }) => {
  const { getValidator, spanSize } = useSpan();

  if (!spanSize) {
    return null;
  }

  if (!spanBlock) {
    if (index === 1) {
      return (
        <Skeleton
          variant="rounded"
          width="100%"
          height={240}
          animation="wave"
        />
      );
    } else {
      return null;
    }
  }

  let selectedColor: "default" | "info" | "error" | "success" | "primary" =
    "default";
  let selectedLabel = "";

  if (spanBlock.status.isProposed) {
    if (spanBlock.status.difficulty === 2n) {
      selectedLabel = `Proposed #${spanBlock.blockNumber.toLocaleString()}`;
      selectedColor = "primary";
    } else if (spanBlock.status.difficulty === 1n) {
      selectedLabel = "Slashed";
      selectedColor = "error";
    } else {
      selectedLabel = "n/a";
    }
  } else {
    selectedLabel = "Next";
  }

  const paperShadow = "-10px 4px 60px 10px #0000003a";

  const validator = getValidator(spanBlock.validator);

  const displayName =
    validator?.profile?.name || shortenAddress(spanBlock.validator);
  const displayImage = validator?.profile?.image || unknownProfileImage;

  if (index === 1) {
    return (
      <Paper
        sx={{
          p: 2,
          position: "relative",
          overflow: "hidden",
          boxShadow: paperShadow,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(0deg, rgba(23,18,38,1) 0%, rgba(255,255,255,0) 65%)",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
          }}
        >
          <Typography color="#ffffffb0" fontSize={14} fontWeight={600}>
            {displayName}
          </Typography>
          <Typography color="#fff" variant="h5">
            #{spanBlock.blockNumber.toLocaleString()}
          </Typography>
        </Box>
        <img
          src={displayImage}
          style={{
            width: "100%",
            borderRadius: "4px",
          }}
        />
      </Paper>
    );
  }
  return (
    <Paper sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing="10px">
          <Box>
            <img
              src={displayImage}
              style={{
                height: "30px",
                borderRadius: "4px",
              }}
            />
          </Box>
          <Typography fontSize={14} fontWeight={600} color="text.secondary">
            {displayName}
          </Typography>
        </Stack>

        <Box>
          <Chip
            color={selectedColor}
            label={selectedLabel}
            size="small"
            sx={{
              fontWeight: 600,
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};
