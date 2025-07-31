export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-sm mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-600">
            © 2024 Verso. All rights reserved.
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-500 text-sm active:text-coral transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 text-sm active:text-coral transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 text-sm active:text-coral transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};