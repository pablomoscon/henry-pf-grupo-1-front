import { useState, useEffect} from 'react';
import Link from 'next/link';
import { ChatModalProps } from '@/interfaces/IChat';

const ChatModal = ({ isOpen, onClose, userReservations = [] }: ChatModalProps) => {


  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-black-dark border border-gold-soft rounded-lg p-6 w-96 shadow-lg relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gold-soft hover:text-red-500'
        >
          ✖
        </button>
        <h2 className='text-gold-soft text-xl font-semibold mb-4'>Mis Chats</h2>
        <ul className='space-y-2'>
          {userReservations.length > 0 ? (
            userReservations.map((reservation) => (
              <li key={reservation.id}>
                <Link
                  href={`/chat/${reservation.id}`}
                  className='block p-2 rounded-lg bg-gold-soft/10 hover:bg-gold-soft/20 transition'
                >
                  {reservation.room.name}
                </Link>
              </li>
            ))
          ) : (
            <p className='text-gray-400'>No tienes chats activos.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatModal;
