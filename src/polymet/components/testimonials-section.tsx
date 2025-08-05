import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/data/dance-studio-data";
import TestimonialCard from "@/polymet/components/testimonial-card";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === TESTIMONIALS.length - 1 ? 0 : current + 1,
    );
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? TESTIMONIALS.length - 1 : current - 1,
    );
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Students Say
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Hear from our community of dancers about their experiences at Rhythm
            & Motion Dance Studio.
          </p>
        </div>

        {/* Testimonials slider */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-mint-400/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-coral-400/10 rounded-full blur-3xl" />

          {/* Slider */}
          <div className="relative z-10">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="max-w-2xl mx-auto">
                      <TestimonialCard
                        name={testimonial.name}
                        role={testimonial.role}
                        image={testimonial.image}
                        quote={testimonial.quote}
                        rating={testimonial.rating}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                onClick={prevSlide}
              >
                <ChevronLeftIcon className="h-5 w-5" />

                <span className="sr-only">Previous testimonial</span>
              </Button>

              {/* Indicators */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index
                        ? "bg-purple-500 w-6"
                        : "bg-purple-200 dark:bg-purple-800"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="sr-only">Testimonial {index + 1}</span>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                onClick={nextSlide}
              >
                <ChevronRightIcon className="h-5 w-5" />

                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
