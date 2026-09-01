import Header from '../_components/header'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Profile from './_components/profile'
import Account from './_components/account'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/actions/user.actio'
const Page = async () => {
  const { userId } = await auth()
  const userJSON = await getUserById(userId!)
  const user = JSON.parse(JSON.stringify(userJSON))
  return (
    <>
      <Header title='Settings' description='Manage your accaunt' />
      <Separator className='my-3 bg-muted-foreground' />
      <Tabs defaultValue='profile'>
        <TabsList>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='account'>Account</TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <Profile />
        </TabsContent>
        <TabsContent value='account'>
          <Account {...user} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Page
