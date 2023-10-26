import Authenticated from '@/Layouts/AuthenticatedLayout.jsx';

function Profile({ auth }) {
  return (
      <Authenticated user={auth.user}>
          <Head
  );
}

export default Profile;
