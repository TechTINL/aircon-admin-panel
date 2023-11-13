import React from 'react';

const Create = () => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Client List" />
        </AuthenticatedLayout>
    )
}

export default Create