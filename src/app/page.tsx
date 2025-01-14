import { getRooms } from "@/services/roomService";
import { IRoom } from "@/interfaces/IRoom";
import Card from "@/components/Card/Card";
import { CalendarIcon } from "@/components/Icons/CalendarIcon";

const rooms = await getRooms();

const Home = () => {
  return (
    <main
      className="relative w-full h-full bg-black text-white-ivory"
      style={{
        backgroundImage: `url('/BannerHome.jpg')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full h-[95vh]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-secondary font-medium text-center">
            The luxury home for your cat
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-center text-gray-ash">
            Exclusive experience, designed for feline comfort.
          </p>
          <a href="#our-suites" className="button_green mt-6">
            EXPLORE
          </a>
        </div>
      </div>
      <div
        id="our-suites"
        className="relative z-10 container pt-12 -mt-12 bg-black/80 backdrop-blur-sm rounded-lg"
      >
        <h1 className="mt-6 mb-2 text-gold-soft font-secondary">Our Suites</h1>
        <div className="bg-dark-soft rounded-lg p-2 mb-2 w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="space-y-2">
              <label className="block text-gold-soft text-sm">Check In</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-ash" />
                </span>
                <input
                  type="date"
                  className="pl-10 w-full p-2 bg-black rounded border border-gray-ash text-white-ivory"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gold-soft text-sm">Check Out</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-ash" />
                </span>
                <input
                  type="date"
                  className="pl-10 w-full p-2 bg-black rounded border border-gray-ash text-white-ivory"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gold-soft text-sm">Cats</label>
              <select className="w-full p-2 bg-black rounded border border-gray-ash text-white-ivory">
                <option value="1">1 Cat</option>
                <option value="2">2 Cats</option>
                <option value="3">3 Cats</option>
                <option value="4">4 Cats</option>
              </select>
            </div>

            <button className="bg-gold-soft hover:bg-gold-soft/90 text-black py-2 px-4 rounded h-[40px] mt-6">
              Search
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-11/12 mx-auto my-4">
          {rooms.map((room: IRoom) => (
            <div key={room.id}>
              <Card room={room} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
