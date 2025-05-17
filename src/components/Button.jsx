const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`shadow-sm text-white cursor-pointer bg-[#FF4C00FF] hover:bg-[#CC3B00FF] px-4 py-2 rounded-md font-medium transition-colors focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
