// src/components/enrollment/TermsModal.tsx - Fully accessible versjon
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import TermsConditions from "@/pages/TermsConditions";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw] sm:w-[95vw] max-w-6xl max-h-[95vh] overflow-y-auto 
                                bg-white dark:bg-surface-dark mx-auto p-6">
        
        {/* Skjulte DialogTitle og DialogDescription for accessibility */}
        <VisuallyHidden>
          <DialogTitle>Betingelser for kursdeltagelse</DialogTitle>
          <DialogDescription>
            Les gjennom våre betingelser som gjelder for alle kurs hos Urban Studios
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Bruk TermsConditions direkte - den har allerede sin egen tittel og styling */}
        <TermsConditions 
          showTitle={true} 
          className="py-0 bg-transparent dark:bg-transparent" 
        />

        <DialogFooter className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            className="w-full lg:w-1/2 mx-auto font-medium font-montserrat py-3 
                      bg-brand-500 hover:bg-brand-600 text-white 
                      transition-colors duration-200 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            Lukk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}