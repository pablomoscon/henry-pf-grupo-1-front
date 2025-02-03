'use client';

import { UserContext } from '@/contexts/userContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(UserContext);
  const userData = user?.response?.user;

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

            <Link
              href={`/clientchat/${userData?.id}`}
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
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span className='font-medium'>Chat</span>
            </Link>

            <Link
              href='/clientfeed'
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
