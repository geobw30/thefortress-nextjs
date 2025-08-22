'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const MainContentWrapper = ({ children }) => {
  const pathname = usePathname();
  
  // Add padding only for non-home pages
  const shouldAddPadding = pathname !== '/';
  
  return (
    <div className={shouldAddPadding ? 'pt-14' : ''}>
      {children}
    </div>
  );
};

export default MainContentWrapper;