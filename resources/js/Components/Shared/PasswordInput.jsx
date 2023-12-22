import { forwardRef, useEffect, useRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@/Components/Shared/assets/Icons.jsx';

export default forwardRef(function PasswordInput(
  { type = 'password', className = '', isFocused = false, ...props },
  ref
) {
  const inputRef = useRef();
  const input = ref || inputRef;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? 'text' : type}
        className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        ref={input}
      />
      {type === 'password' && (
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
      )}
    </div>
  );
});
