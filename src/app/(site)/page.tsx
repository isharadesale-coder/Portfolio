import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import { getProjects } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Works projects={projects} />
      <About />
      <Contact />
    </>
  );
}
