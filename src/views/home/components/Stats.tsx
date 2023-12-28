import { unknownProfileImage } from "@/constants/url";
import { useSpan } from "@/contexts/span";
import { shortenText } from "@/utils/string";
import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

interface StatsProps {
  span: Span;
  spanNumber: bigint;
}

export const Stats: FC<StatsProps> = ({ span, spanNumber }) => {
  const { getValidator } = useSpan();

  function count(s: Span) {
    const m: { [key: string]: number } = {};
    for (const each of s) {
      let v = each.validator;
      if (m[v] === undefined) {
        m[v] = 1;
      } else {
        m[v] += 1;
      }
    }
    return m;
  }

  const countedMap = count(span);
  const ks = Object.keys(countedMap);
  const countedArr = [];
  for (const key of ks) {
    countedArr.push({
      validator: key,
      count: countedMap[key],
      data: getValidator(key),
    });
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Box mb={4} pr={3}>
          <Typography variant="h6">
            Randomization {`@${spanNumber.toLocaleString()}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={12}>
            This show how Proof-of-Stake consensus randoms validators in each
            span.
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              backgroundColor: "grey.50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              borderRadius: 2,
            }}
          >
            <GiPerspectiveDiceSixFacesRandom size="28px" />
          </Box>
        </Box>
      </Stack>
      {countedArr.map((stat, index) => {
        const displayName = stat.data?.profile?.name || stat.validator;
        const displayImage = stat.data?.profile?.image || unknownProfileImage;
        const imageSize = "30px";
        const progress = (stat.count / span.length) * 100;
        return (
          <Box key={`stat-${index}`} mb={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <img
                src={displayImage}
                width={imageSize}
                height={imageSize}
                style={{ borderRadius: "3px" }}
              />
              <Typography fontWeight={600} variant="body2">
                {shortenText(displayName, 14)}
              </Typography>
              <Chip
                label={`${progress.toFixed(2)}%`}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={`${stat.count}/${span.length}`}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Stack>
            <Box my={1}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: "6px",
                  borderRadius: 6,
                  [`&.${linearProgressClasses.colorPrimary}`]: {
                    backgroundColor: "divider",
                  },
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 6,
                    // backgroundColor: "primary.dark"
                  },
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
