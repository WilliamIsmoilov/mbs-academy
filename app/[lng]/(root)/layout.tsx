import { ChildProps } from '@/types/indeex'
import Navbar from './_components/navbar'

function Layout({ children }: ChildProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
