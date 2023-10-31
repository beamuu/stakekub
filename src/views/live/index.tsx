import { useSpan } from "@/contexts/span";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { BlockCard } from "./components/BlockCard";
import { useCoreData } from "@/contexts/core/core";
import { Header } from "./components/Header";
import { ConsensusPlayer } from "./components/ConsensusPlayer";
import { Stats } from "./components/Stats";

export const Live: FC = () => {
  const { currentBlockNumber } = useCoreData();
  const { span, getValidator, currentSpan } = useSpan();
  const [isMinimal, setIsMinimal] = useState(false);
  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Stack direction="row" my={1}>
        <Button
          color="secondary"
          variant="contained"
          sx={{ borderRadius: "100px" }}
          onClick={() => setIsMinimal(!isMinimal)}
        >
          {isMinimal ? "Advance view ->" : "Minimal view ->"}
        </Button>
      </Stack>
      {isMinimal ? (
        <ConsensusPlayer />
      ) : (
        <Box>
          {/* <Header /> */}
          <Grid container>
            <Grid item xs={12} sm={5} md={5} lg={6}>
              <Typography variant="h4" mt={5} gutterBottom>
                We are at span #{currentSpan.toLocaleString()}
              </Typography>
              <Typography variant="h6">
                and currently at block #{currentBlockNumber.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={6}>
              <Stats />
            </Grid>
          </Grid>
          <Grid container my={1} rowSpacing={"3px"} columnSpacing={"3px"}>
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
      )}
    </Container>
  );
};
