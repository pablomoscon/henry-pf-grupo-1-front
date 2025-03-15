'use client';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/contexts/userContext';
import { getPosts } from '@/services/logServices';
import { IPost } from '@/interfaces/IPost';
import CardLog from '../CardLog/CardLog';
import useSocket from '@/hooks/usePost';


const ClientFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);
  const idUser = user?.response.user.id;

  const socket = useSocket(idUser);

  useEffect(() => {
    const loadPosts = async () => {
      if (!idUser) return;
      setLoading(true);
      try {
        const data = await getPosts(idUser);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [idUser]);

useEffect(() => {
  if (!socket) return;

  const handleNewPost = (newPost: IPost) => {
    console.log('📩 Nuevo post recibido:', newPost);

    setPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts];
      console.log('🔄 Actualizando posts:', updatedPosts);
      return updatedPosts;
    });
  };

  socket.on('newPost', handleNewPost);

  return () => {
    socket.off('newPost', handleNewPost);
  };
}, [socket]);

  return (
    <div className='flex justify-center pt-6 pb-16 px-4'>
      <div className='bg-black-dark border border-white-basic rounded-lg p-6 w-full max-w-2xl'>
        <h2 className='text-center text-gold-soft text-3xl mb-4'>
          Cat Community Feed
        </h2>
        {posts.length > 0 ? (
          posts
            .slice()
            .reverse()
            .map((post) => {
              console.log('Renderizando post:', post);
              return <CardLog key={post.id} post={post} />;
            })
        ) : loading ? (
          <p className='text-white-basic text-center mt-4'>Loading posts...</p>
        ) : (
          <p className='text-white-basic text-center mt-4'>
            There are no posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientFeed;