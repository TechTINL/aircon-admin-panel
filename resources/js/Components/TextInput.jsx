import { forwardRef, useEffect, useRef } from 'react';
import { Input } from '@material-tailwind/react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props },
  ref
) {
  const inputRef = useRef();
  const input = ref || inputRef;

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input
      {...props}
      type={type}
      ref={input}
      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
      labelProps={{
        className: 'before:content-none after:content-none',
      }}
    />
  );
});
