import { ChildProps } from '@/types/indeex'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

function Layout({ children }: ChildProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
