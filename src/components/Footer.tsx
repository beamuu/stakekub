import { px } from "@/utils/units"
import { Box, Container, Link, Typography } from "@mui/material"
import { blueGrey, grey } from "@mui/material/colors"

export const Footer = () => {
  return (
    <Container maxWidth="xl" sx={{
      mt: px(60),
      borderColor: "divider",
      borderWidth: "1px 0 0 0",
      borderStyle: "solid",
      py: 4
    }}>
      <Typography color="text.disabled">Source code at <Link href="https://github.com/beamuu/stakekub">github.com</Link></Typography>
      <Typography color="text.disabled" fontSize={12}>Not an ofiicial project</Typography>
    </Container>
  )
}