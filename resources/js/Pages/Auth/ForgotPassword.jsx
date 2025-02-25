import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/Components/Shared/Auth/Card';
import { LockIcon } from '@/Components/Shared/assets/Icons';
import InputLabel from '@/Components/InputLabel';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = e => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <Card>
        <div className="flex items-center grow">
          <div className="mx-4">
            <LockIcon />
            <h3 className="text-zinc-800 text-2xl font-bold leading-loose my-2">
              Forgot Password
            </h3>
            <div className="mb-4 text-sm text-gray-600">
              Please enter the mobile number you’d like your password reset
              information sent to.
            </div>

            <form onSubmit={submit}>
              <div className="my-10">
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
