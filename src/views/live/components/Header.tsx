import { useSpan } from "@/contexts/span"
import { Box, Typography } from "@mui/material"

export const Header = () => {
  const { currentSpan } = useSpan()
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Live at span #{currentSpan.toString()}</Typography>
      <Typography color="text.secondary" variant="body2">We are using realtime on-chain data which are mutable. Try reloading this page if the data is not correct.</Typography>
    </Box>
  )
}