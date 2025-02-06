import { IPost } from "@/interfaces/IPost";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${date.toLocaleDateString("es-ES", options)} a las ${time} hs`;
};

const CardLog: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className="bg-black-light p-4 mb-4 rounded-lg">
      <p className="text-green-olive text-sm mb-2">
        {formatDate(post.timestamp)}
      </p>
      <p className="text-white-basic mb-2">{post.body}</p>
      {post.media_url && (
        <div className="mt-2">
          {post.media_url.includes(".mp4") ? (
            <video className="w-full rounded-lg" controls>
              <source src={post.media_url} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="flex justify-center items-center">
              <img
                src={post.media_url}
                alt="Post"
                className="w-[550px] h-[300px] object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardLog;
