const Input = ({ className, ...props }) => {
  return (
    <input
      className={`shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    />
  );
};

export default Input;
