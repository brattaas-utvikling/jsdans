import React, { useState, useEffect } from 'react';
import { databases, ID } from '../lib/appwrite';
import { useAuth } from '../contexts/AuthContext';
import * as LucideIcons from 'lucide-react';

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
  const { user } = useAuth();

  useEffect(() => {
    async function fetchClasses() {
      try {
        setLoading(true);
        
        // Hent dance classes med populated schedules relationship
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'dance_classes',
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
  
  const handlePurchase = async (classId: string, className: string) => {
    if (!user) {
      alert('Du må være logget inn for å kjøpe');
      return;
    }

    const confirmPurchase = window.confirm(`Vil du kjøpe ${className}?`);
    if (!confirmPurchase) return;

    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'purchases',
        ID.unique(),
        {
          userId: user.$id,
          danceClassId: classId,
          className: className,
          purchaseDate: new Date().toISOString(),
          status: 'completed',
        }
      );
      alert(`${className} er kjøpt! 🎉`);
    } catch (error) {
      console.error('Feil ved kjøp:', error);
      alert('Noe gikk galt. Prøv igjen senere.');
    }
  };

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
              <p><strong>Alder:</strong> {danceClass.age}</p>
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
              className="w-full mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              onClick={() => handlePurchase(danceClass.$id, danceClass.name)}
              disabled={!user}
            >
              {user ? 'Kjøp nå' : 'Logg inn for å kjøpe'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DanceClasses;