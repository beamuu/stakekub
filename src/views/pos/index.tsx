import { useSpan } from "@/contexts/span";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { BlockCard } from "./components/BlockCard";
import { useCoreData } from "@/contexts/core/core";
import { ConsensusPlayer } from "./components/ConsensusPlayer";
import { Stats } from "./components/Stats";
import { blueGrey, grey } from "@mui/material/colors";
import { State } from "./components/State";
import { slashManager } from "@/eth/contract/slash";
import { Warns } from "./components/Warns";
import { SpanTable } from "./components/SpanTable";
import { useRouter } from "next/router";

export const Live: FC = () => {
  const { currentBlockNumber } = useCoreData();
  const { span, spanSize, spanByNumber, currentSpan } = useSpan();
  const { query, push } = useRouter();
  const [isMinimal, setIsMinimal] = useState(false);
  const [specificSpan, setSpecificSpan] = useState<Span>();
  const [querySpanNumber, setQuerySpanNumber] = useState<bigint>();
  const [spanQueryFetchError, setSpanQueryFetchError] =
    useState<boolean>(false);
  function calculateProgress() {
    if (spanSize === 0n) {
      return 0;
    }
    let mod = BigInt(currentBlockNumber) % spanSize;
    let modInt = parseInt(mod.toString());
    let spanSizeInt = parseInt(spanSize.toString());
    return (modInt / spanSizeInt) * 100;
  }

  async function getWarnEvents() {
    await slashManager.warns();
  }

  async function getAndSetSpecificSpan(spanNumber: bigint) {
    if (spanByNumber === undefined) {
      throw new Error("spanByNumber are not defined");
    }
    try {
      const span = await spanByNumber(spanNumber);
      setSpecificSpan(span);
    } catch (_) {
      setSpanQueryFetchError(true);
    }
  }

  function handleProvidedSpecificSpanNumber(queryNumber: string) {
    const spanNumber = BigInt(query.span_number as string);
    setQuerySpanNumber(spanNumber);
  }

  useEffect(() => {
    console.log("span_number changed to", query);
    if (query.span_number) {
      handleProvidedSpecificSpanNumber(query.span_number as string);
    }
  }, [query]);

  useEffect(() => {
    if (querySpanNumber !== undefined) {
      getAndSetSpecificSpan(querySpanNumber);
    }
  }, [querySpanNumber]);

  useEffect(() => {
    getWarnEvents();
  }, []);

  const progress = calculateProgress();
  if (spanSize === 0n) {
    return null;
  }

  if (spanQueryFetchError) {
    return (
      <Container
        sx={{
          py: "30vh",
          textAlign: "center",
        }}
      >
        We cannot find you provided information.
      </Container>
    );
  }

  const showingSpan =
    querySpanNumber === undefined ? currentSpan : querySpanNumber;

  return (
    <>
      <Container maxWidth="xl" sx={{ pt: "60px" }}>
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
            <Stats span={specificSpan || span} spanNumber={showingSpan} />
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          borderRadius: 6,
          mt: 4,
          backgroundColor: grey[100],
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Stack
            mt={4}
            mb={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Chip
              label="<- Previous"
              clickable
              onClick={() => push(`/pos?span_number=${showingSpan - 1n}`)}
              color="secondary"
              sx={{
                width: "100px",
              }}
            />
            <Chip label={`Showing span @${showingSpan.toLocaleString()}`} />
            <Chip
              label="Next ->"
              clickable={showingSpan < currentSpan}
              onClick={() => {
                if (showingSpan !== currentSpan) {
                  push(`/pos?span_number=${showingSpan + 1n}`);
                }
              }}
              color="secondary"
              sx={{
                width: "100px",
              }}
            />
            {/* <LinearProgress
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
            /> */}
          </Stack>
          <SpanTable
            span={specificSpan || span}
            isLive={showingSpan === currentSpan}
          />
          {/* <Grid container spacing={2} my={6}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Warns />
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </>
  );
};
