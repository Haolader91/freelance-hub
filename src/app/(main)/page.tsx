import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Stats />
      <Categories />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
