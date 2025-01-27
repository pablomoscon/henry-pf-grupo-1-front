import About from "@/components/About/About";
import Banner from "@/components/Banner/Banner";
import OurServices from "@/components/OurServices/OurServices";
import Reviews from "@/components/Reviews/Reviews";

const Home = () => {
  return (
    <>
      <main>
        <Banner />
        <About />
        <OurServices />
        <Reviews />
      </main>
    </>
  );
};

export default Home;
