import { Outlet } from 'react-router-dom'
import { Backdrop } from '../visuals/Backdrop'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'

export function RootLayout() {
  return (
    <div className="relative min-h-dvh">
      <Backdrop />
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

