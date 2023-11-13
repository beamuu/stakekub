import { unknownProfileImage } from "@/constants/url";
import { useSpan } from "@/contexts/span";
import { shortenText } from "@/utils/string";
import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export const Stats = () => {
  const { span, getValidator } = useSpan();

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
  console.log(countedMap);
  const ks = Object.keys(countedMap);
  const countedArr = [];
  for (const key of ks) {
    countedArr.push({
      validator: key,
      count: countedMap[key],
      data: getValidator(key),
    });
  }

  const sorted = countedArr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    return 1;
  });
  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box mb={4} pr={3}>
          <Typography variant="h6">Randomization</Typography>
          <Typography variant="body2" color="text.secondary">
            This show how Proof-of-Stake consensus randoms validators in each
            span.
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              backgroundColor: "divider",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              borderRadius: 10,
            }}
          >
            <GiPerspectiveDiceSixFacesRandom size="40px" />
          </Box>
        </Box>
      </Stack>
      {countedArr.map((stat, index) => {
        const displayName = stat.data?.profile?.name || stat.validator;
        const displayImage = stat.data?.profile?.image || unknownProfileImage;
        const imageSize = "30px";
        const progress = (stat.count / span.length) * 100;
        console.log(progress, stat.count);
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
