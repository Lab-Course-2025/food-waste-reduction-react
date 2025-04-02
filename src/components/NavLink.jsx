import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative group transition-colors duration-200 py-1 ${isActive ? "text-[#FF4C00FF]" : "text-black hover:text-[#FF4C00FF]"
        }`}
    >
      {children}
      <span
        className={`absolute left-0 bottom-[-4px] h-[2px] bg-[#FF4C00FF] transition-all duration-500 ${isActive ? "w-full" : "w-0"
          }`}
      ></span>
    </Link>
  );
};

export default NavLink;
