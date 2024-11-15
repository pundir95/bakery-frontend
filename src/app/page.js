import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderSection from "@/_components/HeaderSection";
import OurStorySection from "@/_components/OurStorySection";
import ProductsSection from "@/_components/ProductsSection";
import SignatureDelightBanner from "@/_components/SignatureDelightBanner";
import LimitedTimeOffers from "@/_components/LimitedTimeOffers";

export default function Home() {
  return (
    <div className="home-page">
      {/* <HomePageHeader /> */}
      {/* <HomePageSectionTwo /> */}
      <HeaderSection />
      <OurStorySection />
      <ProductsSection />
      <SignatureDelightBanner />
      <LimitedTimeOffers />
      {/* <HomePageBanner />
      <ContactSection />
      <Footer /> */}
    </div>
  );
}
