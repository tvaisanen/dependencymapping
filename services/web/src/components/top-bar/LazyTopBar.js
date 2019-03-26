import React from 'react';
import * as sc from './top-bar.styled';

const TopBarContainer = React.lazy(()=> import('../top-bar/TopBarContainer'));

/**
 *  Code splitted TopBarContainer
 */

// Component to be rendered while loading
const Fallback = () => (
    <sc.TopBar>...</sc.TopBar>
);

const WrappedWithSuspense = () => (
    <React.Suspense fallback={<Fallback/>}>
       <TopBarContainer/>
    </React.Suspense>
);


export default WrappedWithSuspense;
