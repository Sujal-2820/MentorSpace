import { SidebarInset } from '@/components/ui/sidebar'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileScreen from '../screens/Profile/page'
import RequestsScreen from '../screens/Requests/page'
import SessionsScreen from '../screens/Sessions/page'
import ResourcesScreen from '../screens/Resources/page'
import AnalyticsScreen from '../screens/Analytics/page'

const screenComponents = {
    Profile: ProfileScreen,
    Requests: RequestsScreen,
    Sessions: SessionsScreen,
    Resources: ResourcesScreen,
    Analytics: AnalyticsScreen,
}

export default function Content({ selectedScreen }) {
const SelectedComponent = screenComponents[selectedScreen]

return (
  <SidebarInset className="flex-1 overflow-y-auto bg-gradient-to-br from-background to-muted w-full">
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedScreen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="p-6"
      >
        <SelectedComponent />
      </motion.div>
    </AnimatePresence>
  </SidebarInset>
)
}

