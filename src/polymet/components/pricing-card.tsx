import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

type PricingCardProps = {
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular: boolean;
  color: string;
};

export default function PricingCard({
  name,
  price,
  duration,
  features,
  popular,
  color,
}: PricingCardProps) {
  return (
    <Card
      className={`relative ${color} border transition-all duration-300 h-full flex flex-col`}
    >
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Populære kurs
          </div>
        </div>
      )}

      <CardHeader className="pb-0">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
      </CardHeader>

      <CardContent className="pt-4 flex-grow">
        <div className="mb-6">
          <p className="flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {price}kr
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              {duration}
            </span>
          </p>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 mt-0.5">
                <CheckIcon className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className={`w-full rounded-full ${
            popular
              ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white border-0"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Velg plan
        </Button>
      </CardFooter>
    </Card>
  );
}
