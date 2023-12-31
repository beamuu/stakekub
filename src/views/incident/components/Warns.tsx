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
import { useTranslation } from "next-i18next";
import { AddressTag } from "@/components/AddressTag";

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
  const { t } = useTranslation(["common", "incidents"]);
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
              <Typography fontWeight={500}>
                {t("incidents:warn-events-title")}
              </Typography>
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
                  ? ` - ${t("incidents:info-warns-found", { n: warns.length })}`
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
        <Stack>
          {warns.length === 0 ? (
            <Stack alignItems="center" spacing={2}>
              <Typography variant="h3">👍🏻</Typography>
              <Typography variant="body2">
                {t("incidents:info-all-good")}
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
              <Link
                href={`/?span_number=${each.inner.span.toString()}`}
                key={`warn-${i}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                  sx={{
                    px: 2,
                    py: 2,
                    transition: "300ms ease",
                    "&:hover": {
                      backgroundColor: "grey.50",
                    },
                  }}
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
                      <Typography fontSize={14}>
                        <AddressTag>{each.inner.signer}</AddressTag>
                      </Typography>
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
                        {` ${t("at")} ${unixToDate(
                          each.timestamp
                        ).toLocaleString()}`}
                        {" • "}
                        {"@"}
                        {each.inner.span.toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>

                  <MdOutlineArrowOutward
                    size={px(18)}
                    color="inherit"
                    style={{ opacity: 0.6 }}
                  />
                </Stack>
              </Link>
            );
          })}
          {currentDisplayItems === warns.length ? null : (
            <Button color="secondary" onClick={expand}>
              {t("incidents:info-show-more", {
                n:
                  displaySizeDiff > listExpandSize
                    ? listExpandSize
                    : displaySizeDiff,
              })}
            </Button>
          )}
        </Stack>
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
