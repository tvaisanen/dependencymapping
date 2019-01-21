import React from 'react';

const MappingMenuContainer = React.lazy(()=> import('./MappingMenuContainer'));


const WrappedWithSuspense = () => (
    <React.Suspense fallback={<div>loading..</div>}>
       <MappingMenuContainer/>
    </React.Suspense>
);


export default WrappedWithSuspense;
