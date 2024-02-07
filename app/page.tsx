import Searchbar from "@/components/Searchbar";
import Image from "next/image";

const Home = () => {
  return (
    <section className=" overflow-y-hidden px-6 md:px-20 py-4 sm:py-12 h-[94vh] sm:h-[90vh]">
      <div className="flex max-xl:flex-col items-center lg:mx-16 lg:gap-x-12">
        <div className=" flex flex-col justify-center z-10">
          <h1 className="md:mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900">
            ECX <span className="text-primary"> Price Tracking</span> and
            <span className="text-primary"> Analytics</span>
          </h1>
          <p className="mt-6">
            Discover the historical price movements of commodities on the
            Ethiopian Commodities Market. Subscribe to get reports by email.
          </p>
    

          <Searchbar />
          <p className="small-text mt-3">
            *Market trading days.
          </p>
        </div>

        <div className="sm:mt-10 w-full md:w-fit flex flex-col items-center">
          <Image
            src="/assets/images/hero.png"
            alt="ECANA"
            width={700}
            height={700}
            className="object-contain"
          />
        </div>
      </div>
      <div className="fixed top-0 right-0 text-center p-2  text-gray-600 text-[8px]">
        Want to Contribute?{" "}
        <a
          href="https://github.com/senadev42/ecana"
          target="_blank"
          className="text-teal-600"
        >
          Join us on Github
        </a>
      </div>
    </section>
  );
};
export default Home;
