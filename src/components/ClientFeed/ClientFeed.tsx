"use client";
import { getPosts } from "@/services/logServices";
import { IPost } from "@/interfaces/IPost";
import CardLog from "../CardLog/CardLog";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";

const ClientFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);
  const idUser = user?.response.user.id;

  useEffect(() => {
    const loadPosts = async () => {
      if (!idUser) return;
      setLoading(true);
      try {
        const data = await getPosts(idUser);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [idUser]);

  return (
    <div className="flex justify-center pt-6 pb-16 px-4">
      <div className="bg-black-dark border border-white-basic rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-center text-gold-soft text-3xl mb-4">
          Cat Community Feed
        </h2>
        {posts.length > 0 ? (
          posts
            .slice()
            .reverse()
            .map((post) => <CardLog key={post.id} post={post} />)
        ) : (
          <p className="text-white-basic text-center mt-4">
            No hay posteos aún.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientFeed;
