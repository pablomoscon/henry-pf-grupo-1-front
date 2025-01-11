import Image from "next/image";

const Home = () => {
  return (
    <main>
      <div className="flex flex-col">
        <div className="relative mb-9 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/gato banner4.jpg"
            alt="Banner del sitio"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-secondary font-medium text-center text-white-ivory">
              The luxury home for your cat
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-center text-gray-ash">
              Exclusive experience, designed for feline comfort.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="mt-5  mb-10">Colors</h1>
        <h2>White-Ivory</h2>
        <div className="wrapper bg-white-ivory flex items-center justify-center  p-6">
          <p className="text-black-dark font-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis
            venenatis.
          </p>
        </div>

        <h2 className="mt-8">Green-Olive</h2>
        <div className="wrapper bg-green-olive flex items-center justify-center  p-6 mb-4">
          <p className="text-black-dark font-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis
            venenatis.
          </p>
        </div>

        <h2 className="mt-8">Gold-Soft</h2>
        <div className="wrapper bg-gold-soft flex items-center justify-center  p-6 mb-4">
          <p className="text-black-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis
            venenatis.
          </p>
        </div>

        <h2 className="mt-8">Gray-Ash</h2>
        <div className="wrapper bg-gray-ash flex items-center justify-center  p-6 mb-4">
          <p className="text-black-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis
            venenatis.
          </p>
        </div>

        <h2 className="mt-8">Black-Dark</h2>
        <div className="wrapper bg-black-dark flex items-center justify-center  p-6 mb-4">
          <p className=" text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis
            venenatis.
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-center  p-3">
        <button className="button_gold">Boton Dorado</button>
      </div>

      <div className="mb-5 flex items-center justify-center  p-3">
        <button className="button_green">Boton Verde</button>
      </div>
    </main>
  );
};

export default Home;
