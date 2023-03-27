import Layout from "@/components/Layout";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Path from "@/components/sections/Path";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Path />
      <Skills />
      <Contact />
    </Layout>
  );
}
