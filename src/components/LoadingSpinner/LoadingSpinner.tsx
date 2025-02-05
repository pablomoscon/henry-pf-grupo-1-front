const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div
        role='status'
        aria-label='Loading'
        className='animate-spin rounded-full h-32 w-32 border-8 border-t-4 border-t-yellow-500 border-gray-200'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
