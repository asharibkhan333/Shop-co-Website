import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import BrandLogos from "../Components/Brandlogos/BrandLogos";
import NewArrivals from "../Components/NewArrivals/NewArrivals";
import TopSelling from "../Components/TopSelling/TopSelling";
import DressStyle from "../Components/DressStyle/DressStyle";
import HappyCustomer from "../Components/HappyCustomer/HappyCustomer";
import Newsletter from "../Components/NewsLetter/NewsLetter";
import Footer from "../Components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BrandLogos />
        <NewArrivals />
        <TopSelling />
        <DressStyle />
        <HappyCustomer />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export default Home;