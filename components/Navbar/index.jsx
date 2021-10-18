import {
  Container,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import Logo from "../Logo";
import Navigation from "./Navigation";
import { mobileBreakpointsMap } from "../../config/theme";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const bg = useColorModeValue("gray.100", "black");
  const isMobile = useBreakpointValue(mobileBreakpointsMap);
  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={{ base: 5, lg: 5 }}
      paddingY={{ base: 5, lg: 5 }}
      backgroundColor={isMobile ? bg : "transparent"}
      width="100vw"
      maxWidth="100vw"
      margin={0}
    >
      <Logo />
      <SearchBar />
      <Navigation />
    </Container>
  );
};

export default Navbar;
