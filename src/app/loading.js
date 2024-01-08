'use client'
import { quantum } from 'ldrs'

const loading = () => {
  quantum.register()

  return (
    <div className='flex h-screen items-center justify-center'>
      <l-quantum
        size='150'
        speed='3.00'
        color='#005791'
      ></l-quantum>
    </div>
  )
}

export default loading
