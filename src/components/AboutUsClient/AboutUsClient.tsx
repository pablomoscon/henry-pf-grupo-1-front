"use client";

import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Ezequiel Bonilla",
    image: "/team/ezequiel.png",
    github: "https://github.com/EzequielBonilla",
    linkedin: "https://www.linkedin.com/in/ezequielhbonilla/",
  },
  {
    name: "Pablo Moscon",
    image: "/team/pablo.jpg",
    github: "https://github.com/pablomoscon",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Macarena Exposto",
    image: "/team/macarena.png",
    github: "https://github.com/Mexposto",
    linkedin: "https://www.linkedin.com/in/macarena-exposto/",
  },
  {
    name: "Dominique Courreges",
    image: "/team/dominique.jpg",
    github: "https://github.com/courreges-do",
    linkedin: "https://www.linkedin.com/in/dominiquecou/",
  },
  {
    name: "Andrea Mamani",
    image: "/team/andrea.png",
    github: "https://github.com/almamani",
    linkedin: "https://www.linkedin.com/in/andrea-mamani/",
  },
];

const AboutUsClient = () => {
  return (
    <div className="min-h-screen bg-black text-white-ivory">
      {/* Team Section */}
      <div className="bg-black py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gold-soft font-primary text-5xl text-center mb-20">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gold-soft mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl text-gold-soft mb-2">{member.name}</h3>
                <div className="flex gap-4">
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-soft transition-colors"
                  >
                    <Image
                      src="/github-icon.png"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-soft transition-colors"
                  >
                    <Image
                      src="/linkedin-icon.png"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Description Section */}
      <div className="bg-black-dark relative w-full py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-gold-soft font-primary text-5xl mb-8">
            About Us
          </h1>
          <p className="text-gray-300 text-lg mb-12">
            The Fancy Box was born from our shared love for cats and the
            recognition that they deserve the same level of luxury care as any
            other pet. Our team of passionate developers and cat enthusiasts
            came together to create a unique platform that ensures your feline
            friends receive the royal treatment they deserve while you are away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsClient;
