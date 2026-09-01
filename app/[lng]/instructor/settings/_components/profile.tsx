import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Profile = () => {
  return (
    <div className='mt-6 '>
      <UserProfile routing='hash' />
    </div>
  )
}

export default Profile
