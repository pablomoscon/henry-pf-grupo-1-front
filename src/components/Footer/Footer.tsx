import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-green-dark text-white-ivory  bottom-0 left-0 py-4 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/icoInstagram.png"
              alt="Instagram Icon"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image
              src="/icoFacebook.png"
              alt="Facebook Icon"
              width={24}
              height={24}
            />
          </a>
        </div>
        <div>
          <p className="text-xs font-primary">
            Contact us:{" "}
            <a
              href="mailto:contact@thefancybox.com"
              className="text-white-ivory hover:underline"
            >
              contact@thefancybox.com
            </a>
          </p>
        </div>
        <div>
          <p className="font-primary text-xs">
            &copy; 2025 The Fancy Box. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
