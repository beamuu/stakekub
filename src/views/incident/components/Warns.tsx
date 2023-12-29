import { blocksPerDay } from "@/constants/chain";
import { useCoreData } from "@/contexts/core/core";
import { slashManager } from "@/eth/contract/slash";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSpan } from "@/contexts/span";
import { unknownProfileImage } from "@/constants/url";
import { px } from "@/utils/units";
import { grey } from "@mui/material/colors";
import { unixToDate } from "@/utils/date";
import Link from "next/link";
import { shortenAddress } from "@/utils/string";

type _TfOptions = {
  value: number;
  display: string;
};

const timeframeOptions: { [key: string]: _TfOptions } = {
  "1d": {
    value: 1,
    display: "1d",
  },
  "3d": {
    value: 3,
    display: "3d",
  },
  "7d": {
    value: 7,
    display: "7d",
  },
  "14d": {
    value: 14,
    display: "14d",
  },
  "30d": {
    value: 30,
    display: "30d",
  },
  "60d": {
    value: 60,
    display: "60d",
  },
  "90d": {
    value: 90,
    display: "90d",
  },
  "120d": {
    value: 120,
    display: "120d",
  },
};

const listExpandSize = 20;
const initialDisplaySize = 20;

export const Warns = () => {
  const { currentBlockNumber } = useCoreData();
  const { getValidator } = useSpan();
  const [fetched, setFetched] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<string>("1d");
  const [warns, setWarns] = useState<RPCEvent<WarnEvent>[]>([]);
  const [currentDisplayItems, setCurrentDisplayItems] = useState<number>(0);

  const displaySizeDiff = warns.length - currentDisplayItems;

  function expand() {
    if (displaySizeDiff <= listExpandSize) {
      setCurrentDisplayItems(displaySizeDiff);
    } else {
      setCurrentDisplayItems(currentDisplayItems + listExpandSize);
    }
  }

  async function fetch() {
    setFetched(false);
    const res = await slashManager.warnsBetween(
      currentBlockNumber - blocksPerDay * timeframeOptions[timeframe].value,
      currentBlockNumber
    );
    setWarns(res);
    setFetched(true);
  }

  const handleTimeframeChange = (event: SelectChangeEvent) => {
    setTimeframe(event.target.value);
  };

  useEffect(() => {
    if (currentBlockNumber !== 0 && !fetched) {
      fetch();
    }
  }, [currentBlockNumber]);

  useEffect(() => {
    if (warns.length < initialDisplaySize) {
      setCurrentDisplayItems(warns.length);
    } else {
      setCurrentDisplayItems(initialDisplaySize);
    }
  }, [warns]);

  useEffect(() => {
    fetch();
  }, [timeframe]);

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack direction="row" alignItems="start" spacing={1}>
            <Box>
              <Typography fontWeight={500}>Warn events</Typography>
            </Box>
            <Tooltip
              title="The consensus warns the validators when they miss the block. The validator can be warned once per span. Once thry are warned, the official node takes over the rest of the span."
              placement="top"
            >
              <Box>
                <IoInformationCircleSharp
                  size="23px"
                  style={{ opacity: 0.6 }}
                />
              </Box>
            </Tooltip>
          </Stack>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="timeframe-selector-label"
              size="small"
              color="primary"
              id="timeframe-selector"
              value={timeframe as any}
              onChange={handleTimeframeChange}
            >
              {Object.keys(timeframeOptions).map((k, index) => {
                const tf = timeframeOptions[k];
                return (
                  <MenuItem
                    key={`timeframe-option-${index}`}
                    value={k}
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    {tf.display}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
      <Box>
        <Divider />
        <CardContent
          sx={{
            py: "10px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={12} color="text.disabled">
              Validator{" "}
              <b>
                {fetched && warns.length > 0
                  ? ` - ${warns.length} events found`
                  : ""}
              </b>
            </Typography>
            <Typography fontSize={12} color="text.disabled">
              Span number
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
      </Box>
      {fetched ? (
        <CardContent>
          <Stack spacing={2}>
            {warns.length === 0 ? (
              <Stack alignItems="center" spacing={2}>
                <Typography variant="h3">👍🏻</Typography>
                <Typography variant="body2">
                  All good! No one was warned on this period.
                </Typography>
              </Stack>
            ) : null}
            {warns.slice(0, currentDisplayItems).map((each, i) => {
              const v = getValidator(each.inner.signer);
              const img =
                v === null || v.profile === null || !v.profile.image
                  ? unknownProfileImage
                  : v.profile.image;

              const displayName =
                v === null || v.profile === null || !v.profile.name
                  ? shortenAddress(each.inner.signer)
                  : v.profile.name;
              const imgSize = 38;
              return (
                <Stack
                  key={`warn-${i}`}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img
                      src={img}
                      width={px(imgSize)}
                      height={px(imgSize)}
                      alt="validator-profile-img"
                      style={{
                        borderRadius: "4px",
                      }}
                    />
                    <Box>
                      <Typography fontSize={14}>{displayName}</Typography>
                      <Typography fontSize={12} color="text.disabled">
                        <Typography
                          component="span"
                          color="primary.main"
                          fontSize="inherit"
                        >
                          <b>
                            {"#"}
                            {each.inner.counter.toLocaleString()}
                          </b>
                        </Typography>
                        {` at ${unixToDate(each.timestamp).toLocaleString()}`}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box>
                    <Link href={`/?span_number=${each.inner.span.toString()}`}>
                      <Button
                        size="small"
                        sx={{
                          gap: 1,
                        }}
                      >
                        {"@"}
                        {each.inner.span.toLocaleString()}
                        <MdOutlineArrowOutward size={px(18)} />
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              );
            })}
            {currentDisplayItems === warns.length ? null : (
              <Button color="secondary" onClick={expand}>
                Load more{" "}
                {displaySizeDiff > listExpandSize
                  ? listExpandSize
                  : displaySizeDiff}{" "}
                items
              </Button>
            )}
          </Stack>
        </CardContent>
      ) : (
        <LinearProgress
          color="secondary"
          sx={{
            height: px(2),
          }}
        />
      )}
    </Card>
  );
};
