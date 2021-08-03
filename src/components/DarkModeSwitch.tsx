import { useColorMode, Switch, Box } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box data-testid="darkModeSwitch">
      {isDark ? (
        <SunIcon data-testid="darkModeIcon" color="white" mr={3} />
      ) : (
        <MoonIcon data-testid="darkModeIcon" mr={3} />
      )}
      <Switch
        data-testid="darkModeToggle"
        color="green"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </Box>
  );
};

export default DarkModeSwitch;
