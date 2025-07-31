import { WaitlistForm } from "./WaitlistForm";

export const StickyWaitlist = () => {
  return (
    <div className="sticky-waitlist">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-medium text-slate-black">Be first to use Verso</h3>
            <p className="text-sm text-slate-light">Built for travelers who scroll</p>
          </div>
          <div className="w-full sm:w-auto max-w-sm">
            <WaitlistForm compact />
          </div>
        </div>
      </div>
    </div>
  );
};