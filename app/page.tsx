import FrontCarousel from "@/components/FrontCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-12">
        <div className="flex max-xl:flex-col items-center lg:mx-16 lg:gap-x-12">
          <div className=" flex flex-col justify-center">
            <h1 className="head-text">
              ECX <span className="text-primary"> Price Tracking</span> and
              <span className="text-primary"> Analytics</span>
            </h1>
            <p className="mt-6">
              Discover the historical price movements of commodities on the
              Ethiopian Commodities Market. Subscribe to get
              reports by email.
            </p>

            <Searchbar />
          </div>

          <div className=" mt-10 w- w-full">
            <Image
              src="/assets/images/hero.png"
              alt="ECANA"
              width={700}
              height={700}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Coffee", "Cocoa", "Cotton", "Corn"].map((item) => {
            return (
              <div className="card" key={item}>
                <h3 className="card-text">{item}</h3>
              </div>
            );
          })}
        </div>
      </section> */}
    </>
  );
};
export default Home;
