import { Star } from "lucide-react";

const Review = ({ review }) => {
  const { userName, stars, date, content } = review;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        className={`px-0.5 ${
          i < stars ? "text-yellow-500" : "text-neutral-300"
        }`}
      >
        <Star />
      </button>
    ));
  };

  return (
    <div className="my-2 p-5 bg-white rounded-lg shadow-sm border border-neutral-100">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-neutral-900">{userName}</h4>
          <p className="text-sm text-neutral-500">{formattedDate}</p>
        </div>
        <div className="flex">{renderStars(stars)}</div>
      </div>
      <p className="mt-3 text-neutral-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default Review;
