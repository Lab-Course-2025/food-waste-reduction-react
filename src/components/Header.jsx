// components/Header.js
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";

const Button = ({ children, className, variant, size, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant || "default"]} ${sizeClasses[size || "default"]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b py-3 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-xl">👋</span>
          <a href="/" className="font-bold text-gray-800">
            Ndihmo Tjetrin
          </a>
        </div>

        <nav className="hidden md:flex space-x-6 text-sm text-gray-600 bold">
          <a href="#">Kryefaqja</a>
          <a href="#">Donacionet</a>
          <a href="#">Regjistro një Familje</a>
          <a href="#">Regjistro një Biznes</a>
          <a href="#">Kontakt</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Globe className="h-4 w-4 mr-1" /> Shqip
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden py-3 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-3 text-sm text-gray-600">
            <a href="#">Kryefaqja</a>
            <a href="#">Donacionet</a>
            <a href="#">Regjistro një Familje</a>
            <a href="#">Regjistro një Biznes</a>
            <a href="#">Kontakt</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;