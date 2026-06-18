import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="grain">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
