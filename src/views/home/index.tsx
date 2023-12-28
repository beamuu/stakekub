import { useSpan } from "@/contexts/span";
import {
  Box,
  Container,
  Grid,
  Skeleton,
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
import { Controller } from "./components/Controller";

export const Live: FC = () => {
  const { currentBlockNumber } = useCoreData();
  const { span, spanSize, spanByNumber, currentSpan } = useSpan();
  const { query, push } = useRouter();
  const [isMinimal, setIsMinimal] = useState(false);
  const [specificSpan, setSpecificSpan] = useState<Span>();
  const [querySpanNumber, setQuerySpanNumber] = useState<bigint>();
  const [isFetchingSpan, setIsFetchingSpan] = useState<boolean>(true);
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
      setIsFetchingSpan(true);
      const span = await spanByNumber(spanNumber);
      setSpecificSpan(span);
      setIsFetchingSpan(false);
    } catch (_) {
      setSpanQueryFetchError(true);
    }
  }

  function handleProvidedSpecificSpanNumber(queryNumber: string) {
    const spanNumber = BigInt(query.span_number as string);
    setQuerySpanNumber(spanNumber);
  }

  useEffect(() => {
    if (span.length > 0) {
      setIsFetchingSpan(false);
    }
  }, [span]);

  useEffect(() => {
    console.log("span_number changed to", query);
    if (query.span_number) {
      handleProvidedSpecificSpanNumber(query.span_number as string);
    } else {
      setSpecificSpan(undefined);
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
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Controller showingSpanNumber={showingSpan} />
        <Box my={2}>
          {isFetchingSpan ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={531}
            />
          ) : (
            <SpanTable
              span={specificSpan || span}
              isLive={showingSpan === currentSpan}
            />
          )}
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Grid
          container
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
          >
            <Stats span={specificSpan || span} spanNumber={showingSpan} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
