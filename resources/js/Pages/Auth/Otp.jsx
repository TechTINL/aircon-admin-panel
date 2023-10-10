import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { LockIcon } from '@/Components/Shared/assets/Icons';
import Card from '@/Components/Shared/Auth/Card';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

function Otp({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    phone: '',
  });

  const submit = e => {
    e.preventDefault();

    post(route('password.email'));
  };
  return (
    <GuestLayout>
      <Head title="OTP" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <Card>
        <div className="flex items-center grow">
          <div className="w-full mx-6">
            <LockIcon />
            <h3 className="text-zinc-800 text-2xl font-bold leading-loose my-2">
              Insert OTP
            </h3>
            <div className="mb-4 text-sm text-gray-600">
              Please OTP code that has been to your number +65 xxxxxxxxxxx
            </div>

            <form onSubmit={submit}>
              <div className="my-10">
                <InputLabel
                  htmlFor="phone"
                  value="OTP Code"
                  className="text-zinc-800 text-base font-bold my-1"
                />

                <TextInput
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full"
                  onChange={value => setData('phone', value)}
                />

                <InputError message={errors.phone} className="mt-2" />

                <div className="flex mt-4 justify-end">
                  <Link
                    href="/forgot-password"
                    className="underline text-teal-500 hover:text-teal-900 text-sm font-semibold "
                    to="/forgot-password"
                  >
                    Resend OTP
                  </Link>
                </div>
              </div>

              <div className="w-full mt-4">
                <PrimaryButton
                  className="w-full p-4 flex justify-center bg-primary"
                  disabled={processing}
                >
                  Request OTP
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </GuestLayout>
  );
}

export default Otp;
