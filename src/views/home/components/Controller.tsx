import { useSpan } from "@/contexts/span";
import { px } from "@/utils/units";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "next-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdFiberManualRecord } from "react-icons/md";

interface ControllerProps {
  showingSpanNumber: bigint;
}

const ControllerIconButton = styled(IconButton)(({ theme }) => ({
  height: px(40),
  width: px(40),
  backgroundColor: theme.palette.grey[50],
  borderRadius: px(6),
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const ControllerButton = styled(Button)(({ theme }) => ({
  paddingLeft: px(16),
  paddingRight: px(16),
  backgroundColor: theme.palette.grey[50],
  borderRadius: px(6),
  color: theme.palette.text.primary,
  height: px(40),
  width: "auto",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

export const Controller: FC<ControllerProps> = ({ showingSpanNumber }) => {
  const { push } = useRouter();
  const { currentSpan } = useSpan();
  const { t, i18n } = useTranslation("common");
  const { locale } = useRouter()
  console.log(locale, i18n.languages)
  console.log(t("showing"))

  const getRoutePath = (span: bigint) => {
    return `/?span_number=${span}`;
  };

  const onPrevious = () => {
    push(getRoutePath(showingSpanNumber - 1n));
  };
  const onNext = () => {
    if (showingSpanNumber !== currentSpan) {
      push(getRoutePath(showingSpanNumber + 1n));
    }
  };
  const onSubscribeLiveEvent = () => {
    push("/");
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="View previous span" placement="top">
          <ControllerIconButton onClick={onPrevious} disableRipple>
            <FaArrowLeft size={px(14)} />
          </ControllerIconButton>
        </Tooltip>
        <Tooltip title="View next span" placement="top">
          <ControllerIconButton
            onClick={onNext}
            disableRipple
            disabled={showingSpanNumber === currentSpan}
          >
            <FaArrowRight size={px(14)} />
          </ControllerIconButton>
        </Tooltip>
        <Tooltip title="Jump to current span" placement="top">
          <ControllerButton size="small" onClick={onSubscribeLiveEvent}>
            {t("Live")}
            <MdFiberManualRecord
              size={px(16)}
              style={{
                color: red[500],
                marginLeft: px(4),
              }}
            />
          </ControllerButton>
        </Tooltip>
      </Stack>
      <Box>
        <Typography variant="body2" color="text.escondary">
          {t("Showing")}{" "}
          <strong
            style={{ textDecoration: "underline" }}
          >{`@${showingSpanNumber.toLocaleString()}`}</strong>
        </Typography>
      </Box>
    </Stack>
  );
};
