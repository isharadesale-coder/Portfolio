import About from "@/components/About";
import AGlimpse from "@/components/AGlimpse";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import { getProjects } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Background />
      <div className="relative z-10">
        <Hero />
        <Works projects={projects} />
        <About />
        <AGlimpse />
        <Contact />
      </div>
    </>
  );
}
