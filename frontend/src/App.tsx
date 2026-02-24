import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { AboutPage } from './pages/AboutPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { DetectPage } from './pages/DetectPage'
import { LandingPage } from './pages/LandingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TeamPage } from './pages/TeamPage'

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(6px)' },
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<RootLayout />}>
          <Route
            index
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <LandingPage />
              </motion.div>
            }
          />

          <Route
            path="/detect"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <DetectPage />
              </motion.div>
            }
          />

          <Route
            path="/architecture"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ArchitecturePage />
              </motion.div>
            }
          />

          <Route
            path="/about"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <AboutPage />
              </motion.div>
            }
          />

          <Route
            path="/team"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <TeamPage />
              </motion.div>
            }
          />

          <Route
            path="*"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <NotFoundPage />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
