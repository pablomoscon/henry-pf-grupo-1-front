import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-white-ivory fixed top-0 z-50 shadow-2xl font-primary h-12">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="text-black-dark text-2xl font-bold hover:text-accent transition-colors"
        >
          The Fancy Box
        </Link>
        <ul className="flex items-center gap-6 text-xs font-semibold text-black-dark">
          <li>
            <Link href="#" className="hover:text-accent transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-accent transition-colors">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
