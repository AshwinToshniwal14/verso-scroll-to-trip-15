import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  currentStep: number; // 1-based index
}

const steps = ["Dates", "Guests", "Payment", "Confirmation"] as const;

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Booking progress" className="mb-4">
      <ol className="grid grid-cols-4 gap-3">
        {steps.map((label, idx) => {
          const stepNumber = idx + 1;
          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;
          return (
            <li key={label} className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${active ? 'bg-coral/10 border-coral shadow' : ''}`}>
              {completed ? (
                <CheckCircle2 className="h-4 w-4 text-coral" aria-hidden />
              ) : (
                <span className={`h-5 w-5 grid place-items-center rounded-full text-xs ${active ? 'bg-coral text-white' : 'bg-muted text-foreground'}`}>{stepNumber}</span>
              )}
              <span className="text-sm font-medium">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressBar;
