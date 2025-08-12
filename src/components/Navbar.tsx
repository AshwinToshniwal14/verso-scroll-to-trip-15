import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "how-it-works", label: "How it works" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "plan", label: "Plan" },
] as const;

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const links = useMemo(() => SECTIONS, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          aria-label="Verso home"
          className="font-bold tracking-tight text-primary"
          onClick={() => {
            track("nav_logo_click");
            scrollToId("hero");
          }}
        >
          Verso
        </button>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => {
                  track("nav_link_click", { id: l.id });
                  scrollToId(l.id);
                }}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-md transition-colors",
                  active === l.id ? "bg-muted text-primary" : "hover:bg-muted/60"
                )}
                aria-current={active === l.id ? "page" : undefined}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link to="/login" aria-label="Login" className="inline-flex">
            <Button variant="ghost" size="icon">
              <LogIn className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              track("nav_cta_learn_more_click");
              scrollToId("how-it-works");
            }}
          >
            Learn More
          </Button>
          <Button
            variant="coral"
            onClick={() => {
              track("nav_cta_plan_click");
              scrollToId("plan");
            }}
          >
            Plan Trip
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
