import { unknownProfileImage } from "@/constants/url";
import { useAddress } from "@/contexts/address";
import { useSpan } from "@/contexts/span";
import { shortenAddress } from "@/utils/string";
import { px } from "@/utils/units";
import { Box, Slide, SlideProps, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

type AddressTagProps = {
  children: string;
};

export const AddressTag: FC<AddressTagProps> = ({ children }) => {
  const { t } = useTranslation();
  const [validatorInfo, setValidatorInfo] = useState<ValidatorInfo | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(validatorInfo?.blockSigner ?? children);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { getValidator } = useAddress();
  useEffect(() => {
    setValidatorInfo(getValidator(children));
  }, []);
  const img =
    validatorInfo === null ||
    validatorInfo.profile === null ||
    !validatorInfo.profile.image
      ? unknownProfileImage
      : validatorInfo.profile.image;

  const displayName =
    validatorInfo === null ||
    validatorInfo.profile === null ||
    !validatorInfo.profile.name
      ? shortenAddress(validatorInfo?.blockSigner || children)
      : validatorInfo.profile.name;
  const imgSize = px(14);
  return (
    <Box
      component="span"
      sx={{
        py: px(1),
        px: px(8),
        backgroundColor: "grey.100",
        cursor: "pointer",
        fontSize: 14,
        borderRadius: 1,
        transition: "300ms ease",
        "&:hover": {
          backgroundColor: "grey.200",
        },
      }}
      onClick={handleCopyAddress}
    >
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={t("copied-to-clipboard")}
        TransitionComponent={SlideTransition}
        autoHideDuration={5000}
        ContentProps={{
          sx: {
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "background.paper",
            color: "secondary.contrastText"
          }
        }}
      />
      {displayName}
    </Box>
  );
};
