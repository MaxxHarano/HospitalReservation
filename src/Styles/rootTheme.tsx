import { extendTheme } from '@chakra-ui/react'
import { cardTheme } from './cardStyle'
import { tabsTheme } from './tabStyle'

const theme = extendTheme({
  components: {
    Card: cardTheme,
    Tabs: tabsTheme,

  },
})

export default theme