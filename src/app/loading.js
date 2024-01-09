'use client'

import { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { quantum } = require('ldrs');
      quantum.register();
    }
  }, []);

  return (
    <div className='flex h-screen items-center justify-center'>
      <l-quantum
        size='150'
        speed='3.00'
        color='#005791'
      ></l-quantum>
    </div>
  );
};

export default Loading;

