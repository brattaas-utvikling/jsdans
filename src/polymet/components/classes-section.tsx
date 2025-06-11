import { DANCE_CLASSES } from "@/data/dance-studio-data";
import ClassCard from "@/polymet/components/class-card";

export default function ClassesSection() {
  return (
    <section id="classes" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            Våre kurs
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Finn din stil.
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
          Fra urban grooves til klassisk eleganse – vårt kursprogram er designet for å møte deg der du er og ta deg dit du vil.
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
                level={danceClass.level} // nytt
                age={danceClass.age}     // nytt
                color={danceClass.color}
                icon={danceClass.icon}
                image={danceClass.image}
                schedule={danceClass.schedule}
                instructor={danceClass.instructor}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
