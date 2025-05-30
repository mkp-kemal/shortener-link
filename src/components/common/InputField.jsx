export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  ...rest
}) {
  return (
    <div>
      <label className="block mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-500 ease-in-out"
        {...rest}
      />
    </div>
  );
}
