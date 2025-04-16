const Input = ({ className, ...props }) => {
  return (
    <input
      className={`shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:border-orange-500 transition-colors w-full border-gray-300 ${className}`}
      {...props}
    />
  );
};

export default Input;
