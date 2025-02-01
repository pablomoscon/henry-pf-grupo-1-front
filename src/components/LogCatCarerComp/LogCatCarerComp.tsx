"use client";
import { useState, useContext, useEffect } from "react";
import { getPosts } from "@/services/logServices";
import { UserContext } from "@/contexts/userContext";
import { registerPost } from "@/services/logServices";
import { IPostSend } from "@/interfaces/IPost";
import { IPost } from "@/interfaces/IPost";
import CardLog from "../CardLog/CardLog";
import ModalLog from "../ModalLog/ModalLog";

const LogCatCareComp = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const { user } = useContext(UserContext);

  const token = user?.response.token;
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

  const handleMediaConfirm = (file: File | null) => {
    setMedia(file);
    setFileName(file ? file.name : "");
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const formData: IPostSend = {
      file: media || undefined,
      body: postText,
      sender: "123e4567-e89b-12d3-a456-426614174001",
      receiver: "123e4567-e89b-12d3-a456-426614174000",
      reservationId: "123e4567-e89b-12d3-a456-426614174002",
    };

    console.log("Datos enviados al post", formData);

    try {
      const newPost = await registerPost(formData, token);

      // Insertar el nuevo post al inicio de la lista
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      // Limpiar inputs
      setPostText("");
      setMedia(null);
      setFileName("");

      alert("Post added successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to add post.");
    }
  };

  return (
    <div className="flex justify-center pt-24 pb-16 px-4">
      <div className="bg-black-dark border border-white-basic rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-center text-gold-soft text-3xl mb-4">Pucho</h2>

        {/* Cuadro de carga de post */}
        <div className="bg-black-dark border border-white-basic rounded-lg p-6 mb-4 w-full max-w-2xl">
          <textarea
            className="w-full p-2 rounded-lg bg-black-light text-white-basic"
            placeholder="Write something..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-dark text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              Photo/Video
            </button>
            <button
              className="bg-gold-soft text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Add Post
            </button>
          </div>
          {fileName && (
            <p className="text-white-basic mt-2">Selected file: {fileName}</p>
          )}

          {showModal && (
            <ModalLog
              onClose={() => setShowModal(false)}
              onConfirm={handleMediaConfirm}
            />
          )}
        </div>

        {posts.length > 0 ? (
          posts.map((post) => <CardLog key={post.id} post={post} />)
        ) : (
          <p className="text-white-basic text-center mt-4">
            No hay posteos aún.
          </p>
        )}
      </div>
    </div>
  );
};

export default LogCatCareComp;
