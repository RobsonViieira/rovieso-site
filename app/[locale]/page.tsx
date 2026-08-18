import { unstable_setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChaosToOrder from "@/components/ChaosToOrder";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Header />
      <Hero />
      <ChaosToOrder />
      <Services />
      <Cases />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
