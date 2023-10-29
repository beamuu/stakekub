import { useSpan } from "@/contexts/span";
import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { BlockCard } from "./components/BlockCard";
import { useCoreData } from "@/contexts/core/core";
import { Header } from "./components/Header";

export const Live: FC = () => {
  const { currentBlockNumber } = useCoreData();
  const { span, getValidator } = useSpan();
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Header />
      <Grid container my={2} rowSpacing={"6px"} columnSpacing={"6px"}>
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
    </Container>
  );
};
