import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-white-ivory fixed top-0 z-50 shadow-2xl font-primary h-12">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="flex items-center text-black-dark text-2xl font-bold hover:text-green-dark transition-colors"
        >
          <Image
            src="/LogoApp.png"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2" // Margen derecho
          />
          The Fancy Box
        </Link>
        <ul className="flex items-center gap-6 text-xs font-semibold text-black-dark">
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-green-dark transition-colors"
            >
              <Image
                src="/HomeIcono.png"
                alt="Home Icon"
                width={16}
                height={16}
                className="mr-2"
              />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center hover:text-green-dark transition-colors"
            >
              <Image
                src="/AboutIcono.png"
                alt="About Us Icon"
                width={16}
                height={16}
                className="mr-2"
              />
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center hover:text-green-dark transition-colors"
            >
              <Image
                src="/PerfilIcono.png"
                alt="Sign In Icon"
                width={16}
                height={16}
                className="mr-2"
              />
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
