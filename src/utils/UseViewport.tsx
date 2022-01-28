import * as React from 'react';
import { ViewportContext } from './ViewportContext';
 
export const useViewport = () => {
    const { width, height } = React.useContext(ViewportContext);
    return { width, height };
};