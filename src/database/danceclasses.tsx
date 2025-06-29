import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite';
import * as LucideIcons from 'lucide-react';
// import { log } from 'console';
// import ClassCard from '@/polymet/components/class-card';

interface Schedule {
  $id: string;
  day: string;
  time: string;
  level: string;
  danceClass: string; // ID til relatert dance class
}

interface DanceClass {
  $id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  image: string;
  level: string;
  age: string;
  instructor: string;
  schedules: Schedule[]; // Kommer fra relationship
}

const DanceClasses: React.FC = () => {
  const [classes, setClasses] = useState<DanceClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fjernet useAuth siden vi ikke trenger det for kjøp

  useEffect(() => {
    async function fetchClasses() {
      try {
        setLoading(true);
        
        // Hent dance classes med populated schedules relationship
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_DANCE_CLASSES_COLLECTION_ID,
          [
            // Query.select(['*', 'schedules.*']) // Uncomment hvis du vil bruke Query
          ]
        );

        // Map dokumenter til TypeScript interfaces
        const mappedClasses = response.documents.map(doc => ({
          $id: doc.$id,
          name: doc.name,
          description: doc.description,
          color: doc.color,
          icon: doc.icon,
          image: doc.image,
          level: doc.level,
          age: doc.age,
          instructor: doc.instructor,
          schedules: doc.schedules || [], // Fra relationship
        })) as DanceClass[];
        
        setClasses(mappedClasses);
      } catch (error) {
        console.error('Feil ved henting av danseklasser:', error);
        setError('Kunne ikke laste danseklasser');
      } finally {
        setLoading(false);
      }
    }
    
    fetchClasses();
  }, []);

  
  const getIconComponent = (iconName: string) => {
    const formattedIconName = `${iconName.charAt(0).toUpperCase() + iconName.slice(1)}` as keyof typeof LucideIcons;
    const IconComponent = (LucideIcons[formattedIconName] as React.ComponentType<React.SVGProps<SVGSVGElement>>) || LucideIcons.Star;
    return IconComponent;
  };

//   const handlePurchase = async (classId: string, className: string) => {
//   const confirmPurchase = window.confirm(`Kjøp ${className} for 500 NOK via Vipps?`);
//   if (!confirmPurchase) return;

//   try {
//     const response = await functions.createExecution(
//       import.meta.env.VITE_VIPPS_FUNCTION_ID,
//       JSON.stringify({
//         danceClassId: classId,
//         className: className,
//         amount: 500 * 100,
//         timestamp: new Date().toISOString(),
//       })
//     );

// // console.log('Function response:', response);
// console.log('Status:', response.status);
// console.log('Response body:', response.responseBody);
// console.log('Response errors:', response.responseErrors); // Viktig!

//     if (response.responseStatusCode === 200) {
//       const result = JSON.parse(response.responseBody);
//       console.log('Parsed result:', result); // DEBUG
      
//       if (result.success && result.vippsUrl) {
//         window.location.href = result.vippsUrl;
//       } else {
//         console.error('Missing vippsUrl in result:', result); // DEBUG
//         throw new Error('Ingen Vipps URL mottatt');
//       }
//     }
//   } catch (error) {
//     console.error('Feil ved oppstart av Vipps-betaling:', error);
//     alert('Kunne ikke starte Vipps-betaling. Prøv igjen senere.');
//   }
// };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Laster danseklasser...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-600">Feil: {error}</div>
      </div>
    );
  }

  // Empty state
  if (classes.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Ingen danseklasser funnet</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {classes.map((danceClass) => {
        const IconComponent = getIconComponent(danceClass.icon);

        return (
          <div
            key={danceClass.$id}
            className={`p-4 rounded-lg shadow-md max-w-sm ${danceClass.color}`}
          >
            {/* Header med ikon og navn */}
            <div className="flex items-center gap-2 mb-3">
              <IconComponent className="h-6 w-6" />
              <h2 className="text-xl font-bold">{danceClass.name}</h2>
            </div>

            {/* Bilde */}
            <img
              src={danceClass.image}
              alt={danceClass.name}
              className="w-full h-48 object-cover rounded-md my-2"
              onError={(e) => {
                // Fallback hvis bilde ikke laster
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Dance+Class';
              }}
            />

            {/* Beskrivelse */}
            <p className="text-sm mb-3">{danceClass.description}</p>

            {/* Detaljer */}
            <div className="space-y-1 mb-3">
              <p><strong>Nivå:</strong> {danceClass.level}</p>
              <p><strong>Alder:</strong> {danceClass.age}{" "}år</p>
              <p><strong>Instruktør:</strong> {danceClass.instructor}</p>
            </div>

            {/* Timeplan */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Timeplan:</h3>
              {danceClass.schedules && danceClass.schedules.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {danceClass.schedules.map((schedule) => (
                    <li key={schedule.$id} className="text-sm">
                      {schedule.day} {schedule.time} ({schedule.level})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Ingen timer planlagt</p>
              )}
            </div>

            {/* Kjøp knapp */}
            <button
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
              // onClick={() => handlePurchase(danceClass.$id, danceClass.name)}
            >
              Kjøp for 500 NOK med Vipps 💳
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DanceClasses;