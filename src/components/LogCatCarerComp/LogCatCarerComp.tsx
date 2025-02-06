"use client";
import { useState, useContext, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPosts, registerPost } from "@/services/logServices";
import { UserContext } from "@/contexts/userContext";
import { IPostSend, IPost } from "@/interfaces/IPost";
import CardLog from "../CardLog/CardLog";
import ModalLog from "../ModalLog/ModalLog";

const LogCatCareComp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservationId");
  const userName = searchParams.get("userName");
  const catsNames = searchParams.get("catsNames")?.split(",");
  const idReceiver = searchParams.get("idReceiver");

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
      if (!reservationId) return;
      setLoading(true);
      try {
        const data = await getPosts(reservationId);

        const sortedPosts = data.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [reservationId]);

  const handleMediaConfirm = (file: File | null) => {
    setMedia(file);
    setFileName(file ? file.name : "");
    setShowModal(false);
  };

  const handleSubmit = async () => {
    if (!reservationId) {
      alert("No reservation selected!");
      return;
    }

    if (!postText.trim() && !media) {
      alert("You must add text or select a photo/video before posting.");
      return;
    }

    const formData: IPostSend = {
      file: media || undefined,
      body: postText,
      sender: idUser || "",
      receiver: idReceiver || "",
      reservationId,
    };

    try {
      const newPost = await registerPost(formData, token);

      setPosts((prevPosts) => [newPost, ...prevPosts]);

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
    <div className="flex flex-col items-center min-h-screen pt-32 pb-20 px-4">
      <div className="w-full max-w-2xl mb-6">
        <button
          onClick={() => router.push("/dashcaretaker")}
          className="px-6 py-2 rounded-lg border border-gold-soft/20 text-gold-soft/70 hover:text-gold-soft hover:border-gold-soft/50 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-black-dark border border-white-basic rounded-lg p-6 w-full max-w-2xl">
        <div>
          <h2 className="text-center text-gold-soft text-3xl mb-4">
            Customer - {userName}
          </h2>
          <h3 className="text-center text-white-basic text-xl mb-2">
            Feed Cat: {catsNames?.join(", ")}
          </h3>
        </div>

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
        ) : loading ? (
          <p className="text-white-basic text-center mt-4">Cargando posts...</p>
        ) : (
          <p className="text-white-basic text-center mt-4">
            There are no posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default LogCatCareComp;
