import Navbar from "@/polymet/components/navbar";
import Footer from "@/polymet/components/footer";

interface DanceStudioLayoutProps {
  children: React.ReactNode;
}

export default function DanceStudioLayout({
  children,
}: DanceStudioLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
