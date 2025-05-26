import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
};

export default function TestimonialCard({
  name,
  role,
  image,
  quote,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardContent className="p-8 flex flex-col h-full">
        {/* Quote */}
        <div className="mb-6 flex-grow">
          <div className="relative">
            <div className="absolute -top-4 -left-2 text-5xl text-purple-200 dark:text-purple-800 font-serif">
              "
            </div>
            <p className="relative text-gray-700 dark:text-gray-300 italic">
              {quote}
            </p>
            <div className="absolute -bottom-4 -right-2 text-5xl text-purple-200 dark:text-purple-800 font-serif">
              "
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
            />
          ))}
        </div>

        {/* Person */}
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-purple-200 dark:border-purple-800">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
