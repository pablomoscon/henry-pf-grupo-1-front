const About = () => {
  return (
    <div id="about" className="relative w-full py-20 text-white bg-black">
      <div className="relative z-10 mx-auto px-3 text-center">
        <h4 className="font-primary font-medium text-gray-400 sm:text-base md:text-xl mb-2">
          Welcome to
        </h4>
        <h2 className="text-gold-soft font-medium sm:text-2xl md:text-5xl font-primary mb-16">
          The Fancy Box
        </h2>
        <p className="sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Our mission is to bring your lovely purring child the best vacation
          while you are away. Each day more of us have a loving pet in our home,
          keeping us company. Dogs already have this luxury, but cats got the
          short end of the stick. But not any more.
        </p>
      </div>
    </div>
  );
};

export default About;
