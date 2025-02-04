import { IBookCaretaker } from '@/interfaces/IBook';
import { useRouter } from 'next/navigation';

const CardBook = ({ book }: { book: IBookCaretaker }) => {
  const router = useRouter();

  return (
    <div className='bg-black-dark border border-white-basic rounded-lg p-4 mb-4 flex justify-between items-center'>
      <div className='text-white-basic space-y-1'>
        <p>
          <span className='text-gold-soft font-semibold'>Customer: </span>
          {book.userName}
        </p>
        <p>
          <span className='text-gold-soft font-semibold'>Cats: </span>
          {book.catsNames.join(', ')}
        </p>
        <p>
          <span className='text-gold-soft font-semibold'>Suite: </span>
          {book.roomName}
        </p>
        <p>
          <span className='text-gold-soft font-semibold'>Desde: </span>
          {book.checkInDate}
        </p>
        <p>
          <span className='text-gold-soft font-semibold'>Hasta: </span>
          {book.checkOutDate}
        </p>
      </div>

      <div className='flex flex-col space-y-2'>
        <button className='bg-green-olive hover:bg-green-700 text-white px-6 py-2 rounded-lg'>
          Feed
        </button>
        <button
          onClick={() => router.push(`/chat/${book.userId}`)} // Usar router.push
          className='bg-gold-dark hover:bg-yellow-700 text-white px-6 py-2 rounded-lg'
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default CardBook;
