import PaymentStatus from '@/components/PaymentStatus/PaymentSatus';
import ToastifyAlert from '@/components/ToastifyAlert/ToastifyAlert';
import Link from 'next/link';

export default function PaymentPage() {
  return (
    <div className='text-3xl font-bold text-center py-10 h-screen flex items-center justify-center'>
      <ToastifyAlert />
      <div>
        <PaymentStatus />{' '}
        <Link href='/' className='text-gold-soft block mt-4'>
          Back to The Fancy Box
        </Link>
      </div>
    </div>
  );
}
