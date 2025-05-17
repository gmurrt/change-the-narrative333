import RegisterGuard from '@/components/Auth/RegisterGuard'
import Register from '@/components/Register'
import React from 'react'

const page = () => {
  return (
    <RegisterGuard>
        <div><Register/></div>
    </RegisterGuard>
  )
}

export default page