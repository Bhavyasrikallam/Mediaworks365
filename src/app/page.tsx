import type { Metadata } from "next";
import { site } from "@/content/site";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/home/Hero";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Process } from "@/components/home/Process";
import { SuccessStories } from "@/components/home/SuccessStories";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Marketing That Accelerates Your Business` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <TrustedBy />
      <ServicesGrid />
      <WhyChooseUs />
      <Process />
      <SuccessStories />
      <CtaBand />
    </>
  );
}
