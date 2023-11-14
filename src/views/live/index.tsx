import { useSpan } from "@/contexts/span";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import { FC, useState } from "react";
import { BlockCard } from "./components/BlockCard";
import { useCoreData } from "@/contexts/core/core";
import { ConsensusPlayer } from "./components/ConsensusPlayer";
import { Stats } from "./components/Stats";
import { grey } from "@mui/material/colors";
import { State } from "./components/State";

export const Live: FC = () => {
  const { currentBlockNumber } = useCoreData();
  const { span, getValidator, spanSize } = useSpan();
  const [isMinimal, setIsMinimal] = useState(false);

  function calculateProgress() {
    if (spanSize === 0n) {
      return 0;
    }
    let mod = BigInt(currentBlockNumber) % spanSize;
    let modInt = parseInt(mod.toString());
    let spanSizeInt = parseInt(spanSize.toString());
    return (modInt / spanSizeInt) * 100;
  }

  const progress = calculateProgress();
  if (spanSize === 0n) {
    return null
  }
  return (
    <Container maxWidth="xl" sx={{ py: "60px" }}>
      {/* <Stack direction="row" my={1}>
        <Button
          color="secondary"
          variant="contained"
          sx={{ borderRadius: "100px" }}
          onClick={() => setIsMinimal(!isMinimal)}
        >
          {isMinimal ? "Advance view ->" : "Minimal view ->"}
        </Button>
      </Stack> */}
      {isMinimal ? (
        <ConsensusPlayer />
      ) : (
        <Box>
          {/* <Header /> */}
          <Grid
            container
            sx={{
              borderStyle: "solid",
              borderWidth: "0 1px 1px 0",
              borderColor: "divider",
            }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              lg={6}
              sx={{
                borderStyle: "solid",
                borderWidth: "1px 0 0 1px",
                borderColor: "divider",
              }}
            >
              <State />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              md={7}
              lg={6}
              sx={{
                borderStyle: "solid",
                borderWidth: "1px 0 0 1px",
                borderColor: "divider",
              }}
            >
              <Stats />
            </Grid>
          </Grid>
          <Box mt={4}>
            <LinearProgress
              color="primary"
              variant="determinate"
              value={progress}
              sx={{
                height: "6px",
                [`& .${linearProgressClasses.bar}`]: {
                  borderRadius: 6,
                },
                [`&.${linearProgressClasses.colorPrimary}`]: {
                  backgroundColor: "divider",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              component="div"
              height="auto"
              sx={{
                backgroundColor: `${grey[100]}d0`,
                backdropFilter: "blur(3px)",
                zIndex: 39,
                display: BigInt(currentBlockNumber + 1) % spanSize == 0n ? "flex" : "none",
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
        </Box>
      )}
    </Container>
  );
};
