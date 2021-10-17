import { memo, useCallback } from "react";
import {
  Container,
  Button,
  Flex,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useCycle } from "framer-motion";
import styles from "./styles.module.css";
import MobileMenu from "./toggle";
import { ThemeMode, mobileBreakpointsMap } from "../../config/theme";
import { easing, menuAnim } from "../../config/animations";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Navigation = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const isMobile = useBreakpointValue(mobileBreakpointsMap);

  const menuButtonSize = useBreakpointValue({
    base: "xl",
    md: "sm",
  });
  const bg = useColorModeValue(
    "rgba(237, 242, 247, 0.95)",
    "rgba(18, 18, 18, 0.9)"
  );

  const borderColor = useColorModeValue("teal.500", "cyan.200");

  const IsDark = colorMode === ThemeMode.Dark;
  const btnClassName = `${styles.navBtn} ${!IsDark && styles.dark}`;
  const Icon = IsDark ? SunIcon : MoonIcon;
  const onMenuItemClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isMobile) {
        toggleOpen();
      }
    },
    [isMobile, toggleOpen]
  );

  const NavItem = ({ href, label }) => {
    return (
      <Box
        width={{ base: "100%", lg: "auto" }}
        textAlign={{ base: "center", lg: "left" }}
        marginY={{ base: 2, lg: 0 }}
      >
        <Link href={href} passHref>
          <Button
            fontWeight="light"
            variant="ghost"
            fontSize={menuButtonSize}
            letterSpacing={2}
            className={btnClassName}
            padding={2}
            marginX={2}
            as="a"
            href="/Rohit's-Resume.pdf"
            rel="noreferrer"
            // onClick={onMenuItemClick}
          >
            {label}
          </Button>
        </Link>
      </Box>
    );
  };

  return (
    <>
      <Box
        display={{ base: "flex", xl: "none" }}
        width="80%"
        alignItems="center"
        justifyContent="space-between"
        paddingTop={1}
        className={styles.menuBar}
        zIndex={100}
        top="3%"
      >
        <SearchBar />

        <IconButton
          aria-label="Color Mode"
          variant="ghost"
          icon={<Icon />}
          boxShadow="none"
          onClick={toggleColorMode}
          padding={0}
        />
        <MobileMenu isDarkMode={IsDark} toggle={toggleOpen} isOpen={isOpen} />
      </Box>

      <Container
        width="100%"
        backgroundColor={bg}
        maxWidth={{ base: "100%", sm: "100%", lg: "50%", xl: "80%" }}
        className={styles.menu}
        right={{
          lg: !isMobile ? "2%" : "3.5%",
        }}
        initial="hide"
        animate={(!isMobile || isOpen) && "show"}
        style={{
          width: !isMobile ? "100%" : "100%",
          top: !isOpen && isMobile && "-100vh",
          opacity: !isOpen && isMobile && "0",
          left: isOpen && isMobile && 0,
        }}
        borderColor={isOpen && isMobile && borderColor}
        borderBottomWidth={isOpen && isMobile && "1px"}
        paddingBottom={isOpen && isMobile && "1px"}
        ease={easing}
        variants={menuAnim}
        marginTop={0}
        paddingTop={3}
        as="nav"
      >
        <Flex
          justifyContent={{ base: "center", lg: "flex-end" }}
          direction={{
            base: "column",
            lg: "row",
          }}
          paddingX={{ base: "", sm: "10", lg: "0" }}
          paddingY={{
            base: "10",
            lg: "3",
          }}
          height={{ base: "100vh", lg: "auto" }}
          paddingRight="0"
          paddingBottom={isMobile ? 10 : "0"}
          onClick={onMenuItemClick}
        >
          <Box
            width={{ base: "100%", lg: "auto" }}
            textAlign={{ base: "center", lg: "left" }}
            mr={{ base: 0, lg: "auto" }}
            display={{ sm: "none", md: "none", lg: "none", xl: "block" }}
          >
            <SearchBar />
          </Box>
          <NavItem href="/menu" label="Menu" />
          <NavItem href="/events" label="Event" />
          <NavItem href="/jobs" label="Jobs" />
          <NavItem href="/aboutus" label="About Us" />

          {!isMobile && (
            <Box>
              <IconButton
                marginX={1}
                aria-label="Color Mode"
                variant="ghost"
                icon={<Icon />}
                boxShadow="none"
                onClick={toggleColorMode}
              />
            </Box>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default memo(Navigation);
