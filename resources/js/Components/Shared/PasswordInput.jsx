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
        className={
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm placeholder-gray-300 ' +
          className
        }
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
