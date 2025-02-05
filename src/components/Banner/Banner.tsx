import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="relative w-full h-screen bg-black text-white-ivory"
      style={{
        backgroundImage: `url('/BannerHome.jpg')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>{" "}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-secondary font-medium text-center">
          The luxury home for your cat
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-center text-gray-ash">
          Exclusive experience, designed for feline comfort.
        </p>
        <Link href="/suites" className="button_green mt-6">
          LEARN MORE
        </Link>
      </div>
    </div>
  );
};

export default Banner;
