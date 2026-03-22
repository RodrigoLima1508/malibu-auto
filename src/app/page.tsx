import { Header, Footer, Hero, Services, Results, About, Location, ContactForm, Testimonials } from "@/components";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Results />
        <About />
        <Testimonials />
        <Location />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
