import { useCoreData } from "@/contexts/core/core";
import { useSpan } from "@/contexts/span";
import {
  Box,
  Typography,
} from "@mui/material";

export const Header = () => {
  const { currentBlockNumber } = useCoreData();
  const { currentSpan, getSpanBlock, spanSize } = useSpan();

  function calculateProgress() {
    if (spanSize === 0n) {
      return 0;
    }
    let mod = BigInt(currentBlockNumber) % spanSize;
    let modInt = parseInt(mod.toString());
    let spanSizeInt = parseInt(spanSize.toString());
    return (modInt / spanSizeInt) * 100;
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Live at span #{currentSpan.toString()}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        We are using realtime on-chain data which are mutable. Try reloading
        this page if the data does not correct.
      </Typography>
    </Box>
  );
};
