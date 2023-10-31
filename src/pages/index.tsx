import { Navbar } from "@/components/Navbar";
import { HomePage } from "@/views/home";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Navbar containerSize="lg"/>
      <HomePage />
    </Box>
  );
}
