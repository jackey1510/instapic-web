import { useColorMode, Switch } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <>
      {isDark ? <SunIcon color="white" mr={3} /> : <MoonIcon mr={3} />}
      <Switch
        // position="fixed"
        // top="1rem"
        // right="1rem"
        color="green"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </>
  )
}
