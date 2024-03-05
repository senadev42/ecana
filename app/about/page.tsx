import Image from "next/image";

const About = () => {
  return (
    <div className="container mx-auto py-8 px-4 mt-4 ">
      <div className="flex flex-wrap items-center justify-around mb-10 md:border-2 border-t-2 border-b-2 border-stone-500 p-4 pt-6 rounded-md">
        <div className="w-full lg:w-6/12 lg:pr-8 mb-8 lg:mb-0 text-justify">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            What is the ECX?
          </h2>
          <p className=" leading-relaxed mb-3">
            The ECX is a marketplace where buyers and sellers of agricultural
            commodities can trade with quality, delivery, and payment assurance.
          </p>
          <p className=" leading-relaxed mb-3">
            Established in 2008, it is the first of its kind in Africa, aiming
            to:
          </p>

          <ul className="list-disc pl-8 mb-6">
            <li>
              Provide a transparent and efficient market system for all actors
            </li>
            <li>Protect the rights and interests of farmers and traders</li>
            <li>
              Promote development and modernization of the agricultural sector
            </li>
            <li>Contribute to food security and economic growth</li>
          </ul>
        </div>

        <div className="w-full lg:w-5/12 b-red-400 mb-8 lg:mb-0">
          <Image
            src="/assets/images/about/exchangefloor.jpg"
            width={400}
            height={400}
            className=" w-full h-full object-cover rounded-md"
            alt="ECX floor"
          />
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-10 text-justify">
        <div className=" bg-stone-300 p-3 px-4 rounded-md">
          <h2 className="italic font-bold mb-4">
            What commodities are traded on the ECX?
          </h2>
          <p className=" leading-relaxed mb-2">
            The ECX trades various commodities like coffee, sesame, wheat, and
            beans, each with specified quality standards. It provides grading,
            weighing, certifying, and storing services through its integrated
            warehouse system.
          </p>
        </div>

        <div>
          <h2 className="italic font-bold mb-4">
            How does the ECX trading system work?
          </h2>
          <p className=" leading-relaxed mb-6">
            The ECX matches buyers and sellers in real-time based on price and
            quantity using an electronic trading platform. The platform operates
            in morning and afternoon sessions with different contracts and
            commodities.
          </p>
        </div>

        <div className=" bg-stone-300 md:bg-inherit p-3 px-4 rounded-md">
          <h2 className="italic font-bold mb-4">
            How does the ECX warehouse system work?
          </h2>
          <p className=" leading-relaxed mb-6">
            The ECX ensures quality and quantity through its warehouse system,
            providing grading, weighing, certifying, and storing services. It
            consists of 55 warehouses with modern facilities and technologies.
          </p>
        </div>

        <div className=" md:bg-stone-300 p-3 px-4 rounded-md">
          <h2 className="italic font-bold mb-4">
            How does the ECX payment system work?
          </h2>
          <p className=" leading-relaxed mb-6">
            The ECX guarantees delivery and payment through its clearing and
            settlement system, ensuring funds and commodities transfer within 24
            hours using a Delivery Versus Payment (DVP) mechanism.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;

{
  /* <div classNameName=" text-center p-2  text-gray-600 text-[8px]">
Want to Contribute?{" "}
<a
  href="https://github.com/senadev42/ecana"
  target="_blank"
  classNameName="text-teal-600"
>
  Join us on Github
</a>
</div> */
}
