import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AddressProvider } from "@/contexts/address";
import { CoreDataProvider } from "@/contexts/core/core";
import { SpanLiveProvider } from "@/contexts/span";
import { ethclient } from "@/lib/ethers";
import { IncidentPage } from "@/views/incident";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", [
        "common",
        "navbar",
        "incidents",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default function LivePage() {
  return (
    <CoreDataProvider provider={ethclient}>
      <SpanLiveProvider>
        <AddressProvider>
          <Navbar />
          <IncidentPage />
          <Footer />
        </AddressProvider>
      </SpanLiveProvider>
    </CoreDataProvider>
  );
}
