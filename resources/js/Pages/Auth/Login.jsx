import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PasswordInput from '@/Components/Shared/PasswordInput';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Shared/Auth/Card';

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    phone: '+95 978 780 045 5',
    password: 'password',
    remember: true,
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

      <Card>
        <form onSubmit={submit} className="px-4 md:mt-10 lg:mt-15">
          <div className="flex justify-center">
            <Link href="/">
              <ApplicationLogo className="w-40 h-40 fill-current text-gray-500" />
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
              onlyCountries={['sg', 'my', 'mm']}
              className="mt-1 block w-full"
              value={data.phone}
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

          <div className="flex mt-4 justify-between">
            {/* /!* eslint-disable-next-line jsx-a11y/label-has-associated-control *!/ */}
            {/* <label className="flex items-center"> */}
            {/*  <Checkbox */}
            {/*    name="remember" */}
            {/*    checked={data.remember} */}
            {/*    onChange={e => setData('remember', e.target.checked)} */}
            {/*  /> */}
            {/*  <span className="ml-2 text-sm text-gray-600">Remember me</span> */}
            {/* </label> */}
            <Link
              href="/forgot-password"
              className="underline text-teal-500 hover:text-teal-900 text-sm font-semibold "
              to="/forgot-password"
            >
              Forgot your password?
            </Link>
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
      </Card>
    </GuestLayout>
  );
}
