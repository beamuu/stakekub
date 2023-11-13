import { useCoreData } from "@/contexts/core/core";
import { useSpan } from "@/contexts/span";
import { Box, Grid, Typography } from "@mui/material";
import { Children, FC } from "react";

export const State = () => {
  return (
    <Grid container>
      <BlockNumberDisplay title="Last mined block" />
      <SpanNumberDisplay title="Current span number" />
      <TotalValidatorDisplay title="Total validator" />
    </Grid>
  );
};

interface DisplayProps {
  title?: string;
  value?: string | number | bigint;
}

const BlockNumberDisplay: FC<DisplayProps> = ({ title }) => {
  const { currentBlockNumber } = useCoreData();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      sx={{
        p: 3,
        borderStyle: "solid",
        borderWidth: {
          xs: "0 0 1px 0",
          md: "0 1px 1px 0",
        },
        borderColor: "divider",
      }}
    >
      <DisplayLabel>{title}</DisplayLabel>
      <Typography variant="h5">
        {currentBlockNumber.toLocaleString()}
      </Typography>
    </Grid>
  );
};

const SpanNumberDisplay: FC<DisplayProps> = ({ title }) => {
  const { currentSpan } = useSpan();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      sx={{
        p: 3,
        borderStyle: "solid",
        borderWidth: "0 0 1px 0",
        borderColor: "divider",
      }}
    >
      <DisplayLabel>{title}</DisplayLabel>
      <Typography variant="h5">{currentSpan.toLocaleString()}</Typography>
    </Grid>
  );
};

const TotalValidatorDisplay: FC<DisplayProps> = ({ title }) => {
  const { totalValidator } = useSpan();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      sx={{
        p: 3,
        borderStyle: "solid",
        borderWidth: {
          xs: "0 0 1px 0",
          md: "0 1px 1px 0",
        },
        borderColor: "divider",
      }}
    >
      <DisplayLabel>{title}</DisplayLabel>
      <Typography variant="h5">{totalValidator}</Typography>
    </Grid>
  );
};

interface DisplayLabelProps {
  children?: any;
}

const DisplayLabel: FC<DisplayLabelProps> = ({ children }) => {
  return (
    <Typography
      variant="body2"
      fontSize={12}
      fontWeight={700}
      color="text.secondary"
      gutterBottom
      letterSpacing="0.2rem"
      textTransform="uppercase"
      mb={2}
    >
      {children}
    </Typography>
  );
};
