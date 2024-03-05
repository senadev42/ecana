import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <header className="w-full">
        <nav className="flex justify-between items-center px-6 md:px-20 py-4">
          <Link href="/" className="flex items-center gap-2  ">
            <div className="w-[35px] ">
              <Image
                src="/assets/icons/logo.png"
                width={40}
                height={40}
                alt="logo"
              />
            </div>

            <div className="flex flex-row items-end gap-x-2">
              <p className="font-josefin text-[26px] text-secondary leading-7">
                EC<span className="text-primary">ANA</span>
              </p>

              <p className=" text-xs text-gray-400 leading-2">In Development</p>
            </div>
          </Link>

          <div className="flex items-center gap-5">
            <Link href="/">
              <p>Home</p>
            </Link>
            <Link href="/about">
              <p>About</p>
            </Link>
            <Link href="https://github.com/senadev42/ecana"  target="_blank" className="text-teal-600 ">
              <p>Contribute</p>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
