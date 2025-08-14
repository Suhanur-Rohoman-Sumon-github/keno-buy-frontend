"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "1",
    user: "Tanmoy P.",
    rating: 5,
    comment: "Amazing product! Loved the quality and packaging.",
    date: "July 12, 2025",
  },
  {
    id: "2",
    user: "Parvez A.",
    rating: 4,
    comment: "Great value for the price. Will buy again!",
    date: "July 10, 2025",
  },
];

const ReviewPage = () => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleSubmit = () => {
 
    setUserRating(0);
    setUserComment("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Product Reviews</h1>
        <p className="text-muted-foreground">
          Average Rating:{" "}
          <span className="text-primary font-semibold">
            {averageRating.toFixed(1)}
          </span>{" "}
          ({reviews.length} reviews)
        </p>
      </div>

      {/* Add Review */}
      <Card className="p-4">
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Write a Review</h2>
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 cursor-pointer transition ${
                  i < userRating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground"
                }`}
                onClick={() => setUserRating(i + 1)}
              />
            ))}
          </div>
          {/* Comment */}
          <Textarea
            placeholder="Write your review here..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            disabled={userRating === 0 || userComment.trim() === ""}
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{review.user}</h3>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
