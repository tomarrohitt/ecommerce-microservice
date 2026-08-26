import { Star } from "lucide-react";

export function StarRating({
  rating,
  size = "normal",
}: {
  rating: number;
  size?: "small" | "normal";
}) {
  const sizeClass = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? "fill-neutral-400 text-neutral-400"
              : i < rating
                ? "fill-neutral-200 text-neutral-400"
                : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
