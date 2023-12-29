import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CoreDataProvider } from "@/contexts/core/core";
import { SpanLiveProvider } from "@/contexts/span";
import { ethclient } from "@/lib/ethers";
import { IncidentPage } from "@/views/incident";

export default function LivePage() {
  return (
    <CoreDataProvider provider={ethclient}>
      <SpanLiveProvider>
        <Navbar />
        <IncidentPage />
        <Footer />
      </SpanLiveProvider>
    </CoreDataProvider>
  );
}
