import Link from "next/link";
import Image from "next/image";


const Navbar = () => {
  return (
    <div>
      <header className="w-full">
        <nav className="flex justify-between items-center px-6 md:px-20 py-4">
          <Link href="/" className="flex items-end gap-2">
            <div className="w-[35px]">
              <Image
                src="/assets/icons/logo.png"
                width={40}
                height={40}
                alt="logo"
              />
            </div>

            <p className="font-josefin text-[26px] text-secondary leading-7">
              EC<span className="text-primary">ANA</span>
            </p>
            <p className="flex gap-2 text-xs text-gray-500 leading-7">In Development</p>
          </Link>

          <div className="flex items-center gap-5">
            {/* <p>Home</p> */}
            {/* <p>Overview</p>
            <p>Coffee</p> */}
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
