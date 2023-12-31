import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CoreDataProvider } from "@/contexts/core/core";
import { SpanLiveProvider } from "@/contexts/span";
import { ethclient } from "@/lib/ethers";
import { Live } from "@/views/home";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", [
        "common",
        "navbar",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default function LivePage() {
  return (
    <CoreDataProvider provider={ethclient}>
      <SpanLiveProvider>
        <Navbar />
        <Live />
        <Footer />
      </SpanLiveProvider>
    </CoreDataProvider>
  );
}
