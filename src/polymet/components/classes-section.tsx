import { Button } from "@/components/ui/button";
import { DANCE_CLASSES } from "@/polymet/data/dance-studio-data";
import ClassCard from "@/polymet/components/class-card";

export default function ClassesSection() {
  return (
    <section id="classes" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
            Our Classes
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Find Your Perfect Dance Style
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            From high-energy hip hop to expressive contemporary, we offer
            classes for all ages and skill levels. Discover your passion and
            express yourself through movement.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coral-400/10 rounded-full blur-3xl" />

          {/* Class cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {DANCE_CLASSES.map((danceClass) => (
              <ClassCard
                key={danceClass.id}
                name={danceClass.name}
                description={danceClass.description}
                color={danceClass.color}
                icon={danceClass.icon}
                image={danceClass.image}
                schedule={danceClass.schedule}
                instructor={danceClass.instructor}
              />
            ))}
          </div>
        </div>

        {/* View all classes button */}
        <div className="mt-12 text-center">
          <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
            View All Classes
          </Button>
        </div>
      </div>
    </section>
  );
}
