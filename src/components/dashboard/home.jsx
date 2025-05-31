import Content from "./content";
import Header from "./header";
import HeroSection from "./hero";

export default function HomePage() {
  return (
    <div className="dark:bg-gray-900 transition-colors duration-500 ease-in-out">
      <Header />
      <HeroSection />
      <Content />
    </div>
  );
}
