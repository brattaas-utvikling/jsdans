import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Schedule = {
  day: string;
  time: string;
  studio: string;
};

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  imageUrl?: string;
  schedule: Schedule[];
  maxCapacity?: number;
  currentEnrollment?: number;
};

export default function InfoModal({
  open,
  onOpenChange,
  title,
  description,
  imageUrl,
  schedule,
  maxCapacity,
  currentEnrollment,
}: ModalProps) {
  const availableSpots = maxCapacity && currentEnrollment ? maxCapacity - currentEnrollment : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full rounded-xl object-cover max-h-64" 
            />
          )}
          
          {/* Capacity info */}
          {maxCapacity && currentEnrollment !== undefined && (
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Kapasitet:</h4>
              <div className="flex justify-between text-sm">
                <span>Påmeldte: {currentEnrollment}</span>
                <span>Max: {maxCapacity}</span>
                <span className={availableSpots && availableSpots > 0 ? "text-green-600" : "text-red-600"}>
                  {availableSpots && availableSpots > 0 ? `${availableSpots} plasser igjen` : "Fullt"}
                </span>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Timeplan:</h3>
            <div className="space-y-2">
              {schedule.map((s, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                >
                  <span className="font-medium">{s.day}</span>
                  <span className="text-gray-700 dark:text-gray-300">{s.time}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{s.studio}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full"
            variant="default"
          >
            Lukk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}