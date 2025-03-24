const Button = ({ children, className, ...props }) => {
    return (
      <button
        className={`shadow-sm cursor-pointer bg-orange-500 px-4 py-2 rounded-md font-medium transition-colors focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  