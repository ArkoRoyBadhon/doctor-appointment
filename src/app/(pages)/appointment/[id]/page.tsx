import AppointmentDetail from '@/components/appointment/AppointmentDetail';
import React from 'react';

const page = ({params}: {params: {id:string}}) => {

    console.log("params", params?.id);
    
    return (
        <main>
            <AppointmentDetail id={params?.id} />
        </main>
    );
};

export default page;