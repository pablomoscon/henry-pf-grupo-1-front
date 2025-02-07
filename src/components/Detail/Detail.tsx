'use client';
import Image from 'next/image';
import { IRoomResponse } from '@/interfaces/IRoom';
import { useContext } from 'react';
import { UserContext } from '@/contexts/userContext';
import { useRouter, usePathname } from 'next/navigation';

const Detail = ({ room }: { room: IRoomResponse }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleBook = () => {
    if (user) {
      router.push(
        `/reserve?roomId=${room.id}&name=${room.name}&price=${room.price}&numCat=${room.number_of_cats}`
      );
    } else {
      alert('Please log in first!');
      router.push(`/login?redirect=${pathname}`);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center pt-24 px-6 py-12'>
      <div className='w-full max-w-3xl bg-black-light rounded-xl shadow-lg p-6 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch'>
          <div className='relative w-full h-full max-h-[400px] rounded-lg overflow-hidden shadow-md'>
            <Image
              src={room.img}
              alt={room.name}
              layout='fill'
              objectFit='cover'
              className='transition-transform duration-300 hover:scale-105'
            />
          </div>
          <div className='flex flex-col justify-between h-full'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold text-gold-soft'>{room.name}</h2>
              <p className='text-gray-300 leading-relaxed text-base text-justify'>
                {room.description}
              </p>

              <div>
                <h3 className='text-base font-semibold text-gold-soft'>
                  Features
                </h3>
                <ul className='list-disc pl-3 text-gray-300 space-y-1'>
                  {room.features.map((feature, index) => (
                    <li key={index} className='text-sm'>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <p className='text-base'>
                <span className='font-semibold text-gold-soft'>Cats:</span>{' '}
                {room.number_of_cats}
              </p>
            </div>
            <div className='flex justify-between items-center mt-3'>
              <h3 className='text-base font-normal text-green-olive'>
                ${room.price} USD / day
              </h3>
              <button
                className='bg-green-dark hover:bg-green-olive text-white font-normal text-lg px-4 py-1 rounded-lg transition-all duration-300 shadow-md'
                onClick={handleBook}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
