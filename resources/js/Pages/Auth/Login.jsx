import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import LoginCoverImage from '@/Components/Shared/assets/images/login-cover.png';
import PasswordInput from '@/Components/Shared/PasswordInput';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    phone: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = e => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div className="mb-4 text-sm text-gray-600">
          <img src={LoginCoverImage} alt="hero" />
        </div>
        <form onSubmit={submit} className="px-4">
          <div className="flex justify-center">
            <Link href="/">
              <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </Link>
          </div>
          <div>
            <InputLabel
              htmlFor="phone"
              value="Mobile Number"
              className="text-zinc-800 text-base font-bold my-1"
            />

            <PhoneNumberInput
              id="phone"
              name="phone"
              className="mt-1 block w-full"
              onChange={value => setData('phone', value)}
            />

            <InputError message={errors.phone} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <PasswordInput
              id="password"
              type="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={e => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="block mt-4">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={e => setData('remember', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton
              className="w-full flex justify-center bg-primary p-4"
              disabled={processing}
            >
              Log in
            </PrimaryButton>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
