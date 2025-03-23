const Input = ({ className, ...props }) => {
  return (
    <input
      className={`shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:border-orange-500 transition-colors ${className}`}
      {...props}
    />
  );
};

export default Input;
