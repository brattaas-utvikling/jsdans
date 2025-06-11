import Footer from "./Footer";
import Navbar from "./Navbar";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
