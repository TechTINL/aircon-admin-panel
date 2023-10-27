import Authenticated from '@/Layouts/AuthenticatedLayout';

function Profile({ auth }) {
  return (
    <Authenticated user={auth.user}>
      <h1>Profile</h1>
    </Authenticated>
  );
}

export default Profile;
