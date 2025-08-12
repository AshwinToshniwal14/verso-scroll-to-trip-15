import NewsletterSignup from "./NewsletterSignup";

export const Footer = () => {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="text-lg font-bold mb-3">Verso</div>
            <p className="text-sm text-muted-foreground mb-4">Turn saved content into day-wise itineraries.</p>
            <NewsletterSignup />
          </div>

          <nav>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:underline">How it works</a></li>
              <li><a href="#gallery" className="hover:underline">Gallery</a></li>
              <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
            </ul>
          </nav>

          <nav>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#plan" className="hover:underline">Plan</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Creators</a></li>
            </ul>
          </nav>

          <nav>
            <h4 className="font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex items-center justify-between border-t pt-6 text-sm text-muted-foreground">
          <div>© 2024 Verso. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:underline">Back to top ↑</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
