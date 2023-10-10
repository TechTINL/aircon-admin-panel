import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/Components/Shared/Auth/Card';
import { LockIcon } from '@/Components/Shared/assets/Icons';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = e => {
    e.preventDefault();

    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <Card>
        <div className="flex items-center grow">
          <div className="mx-4 w-full">
            <LockIcon />
            <h3 className="text-zinc-800 text-2xl font-bold leading-loose my-2">
              New Password
            </h3>
            <div className="mb-4 text-sm text-gray-600">
              Please enter your new password.
            </div>
            <form onSubmit={submit}>
              <div className="mt-4">
                <InputLabel htmlFor="password" value="Enter New Password" />

                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  isFocused
                  onChange={e => setData('password', e.target.value)}
                />

                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="password_confirmation"
                  value="Confirm New Password"
                />

                <TextInput
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  onChange={e =>
                    setData('password_confirmation', e.target.value)
                  }
                />

                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center mt-16 lg:mt-32">
                <PrimaryButton
                  className="w-full p-4 flex justify-center bg-primary"
                  disabled={processing}
                >
                  Reset Password
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </GuestLayout>
  );
}
