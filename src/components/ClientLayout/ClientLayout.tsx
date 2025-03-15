'use client';

import { UserContext } from '@/contexts/userContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { getUserReservations } from '@/services/bookService';
import { IReservation } from '@/interfaces/IReserve';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(UserContext);
  const userId = user?.response.user.id;
  const token = user?.response.token;

  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [userReservations, setUserReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    if (userId) {
      const fetchReservations = async () => {
        const reservations = await getUserReservations(userId, token);
        setUserReservations(reservations);
      };
      fetchReservations();
    }
  }, [userId, token]);

  return (
    <div className='min-h-screen pt-24 pb-16 flex bg-black-dark'>
      {/* Sidebar */}
      <div className='w-64 fixed h-full bg-black-dark border-r border-gold-soft/10'>
        <nav className='p-6 space-y-4'>
          <div className='space-y-2'>
            <Link
              href='/profile'
              className='flex items-center gap-3 p-3 rounded-lg text-gold-soft hover:bg-gold-soft/10 transition-all duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span className='font-medium'>My Profile</span>
            </Link>

            <Link
              href='/my-cats'
              className='flex items-center gap-3 p-3 rounded-lg text-gold-soft hover:bg-gold-soft/10 transition-all duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              <span className='font-medium'>My Cats</span>
            </Link>

            <Link
              href='/my-reservations'
              className='flex items-center gap-3 p-3 rounded-lg text-gold-soft hover:bg-gold-soft/10 transition-all duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <span className='font-medium'>My Reservations</span>
            </Link>

            <button
              onClick={() => setIsChatsOpen(!isChatsOpen)}
              className='flex items-center gap-3 p-3 rounded-lg text-gold-soft hover:bg-gold-soft/10 transition-all duration-300 w-full text-left relative mb-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span className='font-medium text-lg'>Chats</span>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-4 w-4 ml-auto transition-transform ${
                  isChatsOpen ? 'rotate-180' : ''
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            {/* Menú de chats ahora dentro del flujo normal */}
            {isChatsOpen && (
              <div className='mt-2 w-full bg-black border border-gold-soft/20 rounded-lg shadow-md overflow-hidden'>
                <ul className='py-2 text-sm text-gold-soft'>
                  {userReservations.length > 0 ? (
                    <ul className='space-y-2'>
                      {userReservations.map(
                        ({ id, room, checkInDate, checkOutDate }) => (
                          <li key={id} className='text-center'>
                            <Link
                              href={`/client-chat/${id}`}
                              className='block px-4 py-2 transition hover:bg-gold-soft/10'
                            >
                              <span className='text-base font-bold'>
                                {room.name}
                              </span>
                              <br />
                              <span className='text-sm text-gray-500 block'>
                                Check-in: {checkInDate}
                              </span>
                              <span className='text-sm text-gray-500 block'>
                                Check-out: {checkOutDate}
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className='px-4 py-2 text-xs text-gray-400 text-center'>
                      No tienes chats activos.
                    </p>
                  )}
                </ul>
              </div>
            )}

            <Link
              href='/client-feed'
              className='flex items-center gap-3 p-3 rounded-lg text-gold-soft hover:bg-gold-soft/10 transition-all duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <span className='font-medium'>Feed</span>
            </Link>

            <Link
              href='/cameras'
              className='flex items-center gap-3 p-3 rounded-lg text-gold-soft hover:bg-gold-soft/10 transition-all duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
              <span className='font-medium'>Live Cameras</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 ml-64 p-8'>
        <div className='container mx-auto'>{children}</div>
      </div>
    </div>
  );
}
