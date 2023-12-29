import { Box, Grid } from "@mui/material";
import { BlockCard } from "./BlockCard";
import { FC } from "react";
import { useCoreData } from "@/contexts/core/core";
import { useSpan } from "@/contexts/span";
import { grey } from "@mui/material/colors";

interface SpanTableProps {
  span: Span;
  isLive: boolean;
}

export const SpanTable: FC<SpanTableProps> = ({ span, isLive }) => {
  const { currentBlockNumber } = useCoreData();
  const { getValidator, spanSize } = useSpan();
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        component="div"
        height="auto"
        sx={{
          backgroundColor: "grey.50",
          backdropFilter: "blur(3px)",
          zIndex: 39,
          display:
            BigInt(currentBlockNumber + 1) % spanSize == 0n && isLive ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          transition: "400ms ease",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <span className="loader"></span>
      </Box>
      <Grid
        zIndex={39}
        container
        sx={{
          borderStyle: "solid",
          borderWidth: "1px 0 0 1px",
          borderColor: "divider",
        }}
      >
        {span.map((block, index) => {
          const info = getValidator(block.validator);
          return (
            <BlockCard
              key={`block-${index}`}
              spanBlock={block}
              validatorInfo={info}
              next={BigInt(currentBlockNumber + 1) === block.blockNumber}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
