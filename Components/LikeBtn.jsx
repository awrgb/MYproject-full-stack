import { useState } from "react";
import { useTheme } from "next-themes";
import useSWR, { useSWRConfig } from "swr";
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading } from "react-icons/ai";

// ... (import statements)

function LikeBtn({ id }) {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/likes/${id}`);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/like-blog", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        mutate(`/api/likes/${id}`);
      } else {
        console.error("Error updating likes:", await response.text());
      }
    } catch (error) {
      console.error("Error handling click:", error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    console.error("Error fetching likes:", error);
    // Handle the error state in your UI as needed
    return (
    <>
    <div>Error fetching likes</div>;
    </>
    )
  }

  return (
    <div className="justify-center pt-16 pb-6 flex flex-row items-center">
      {loading ? (
        <AiOutlineLoading
          className="animate-spin"
          style={{ fontSize: "1.5rem" }}
        />
      ) : (
        <>
          <button onClick={handleClick} disabled={loading}>
            {data && data.hasUserLiked ? (
              <AiFillHeart
                style={{ fontSize: "2rem", color: "rgba(220, 38, 38)" }}
              />
            ) : (
              <AiOutlineHeart style={{ fontSize: "2rem" }} />
            )}
          </button>
          <span style={{ fontSize: "1rem", paddingLeft: "16px" }}>
            {data && data.totalLikes}
          </span>
        </>
      )}
    </div>
  );
}

export default LikeBtn;
