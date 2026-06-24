import { UserProfile } from '@clerk/nextjs'
import Header from '../_components/header'

const Page = () => {
  return (
    <>
      <Header title='Settings' description='Manage your accaunt' />

      <div className='mt-6 '>
        <UserProfile routing='hash' />
      </div>
    </>
  )
}

export default Page
