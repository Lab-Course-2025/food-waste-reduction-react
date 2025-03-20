

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-yellow-500 text-xl">👋</span>
            <span className="font-bold">Ndihmo Tjetrin</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <a href="#">Rreth Nesh</a>
            <a href="#">Donacionet</a>
            <a href="#">Qendrat e ndihmave</a>
            <a href="#">Na kontaktoni</a>
            <a href="#">FAQs</a>
            <a href="#">Karriera</a>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-800 text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1">
              <option>Shqip</option>
            </select>
          </div>
          <div className="mb-4 md:mb-0">© 2025 Ndihmo Tjetrin</div>
          <div className="flex space-x-4">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
