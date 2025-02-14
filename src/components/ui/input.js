export function Input({ type = "text", placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-[#197686] rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#197686]"
      />
    );
  }
  