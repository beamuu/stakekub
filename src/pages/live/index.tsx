import { Navbar } from "@/components/Navbar";
import { CoreDataProvider } from "@/contexts/core/core";
import { SpanLiveProvider } from "@/contexts/span";
import { ethclient } from "@/lib/ethers";
import { Live } from "@/views/live";

export default function LivePage() {
  return (
    <CoreDataProvider provider={ethclient}>
      <SpanLiveProvider>
        <Navbar />
        <Live />
      </SpanLiveProvider>
    </CoreDataProvider>
  );
}
