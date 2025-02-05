import Image from "next/image";

const services = [
  {
    icon: "/icoDiario.png",
    title: "Cat Updates",
    description:
      "Stay informed with daily updates about your cat's well being.",
  },
  {
    icon: "/icoMedia.png",
    title: "Photos & Videos",
    description:
      "Receive adorable photos and videos capturing your cat's special moments.",
  },
  {
    icon: "/icoVideoVivo.png",
    title: "Live Videos",
    description: "Watch your cat in real time through live video streams.",
  },
  {
    icon: "/icoChat.png",
    title: "Chat with Caretaker",
    description:
      "Chat directly with your cat's caretaker for questions or personalized updates.",
  },
];

const OurServices = () => {
  return (
    <section className="relative bg-gold-soft py-20 px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black-light font-primary font-semibold sm:text-3xl md:text-4xl pb-5">
          Your Cat&apos;s Journal
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-64 h-54 bg-white rounded-2xl shadow-lg flex flex-col items-center p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4">
              <Image
                src={service.icon}
                alt={service.title}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
