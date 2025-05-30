export default function InputField({
    id,
    name,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    required = false, // default false
}) {
    return (
        <div>
            <label className="block mb-1" htmlFor={id}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-500 ease-in-out
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
        `}
                aria-required={required}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
