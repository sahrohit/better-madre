import {
  Container,
  useColorModeValue,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import Logo from "../Logo";
import Navigation from "./Navigation";
import { mobileBreakpointsMap } from "../../config/theme";
import SearchBar from "./SearchBar";

const Navbar = ({ isFixed }) => {
  // const bg = useColorModeValue("gray.100", "black");
  const bg = useColorModeValue("rgba(237, 242, 247, 0.98)", "black");

  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={{ base: 5, lg: 5 }}
        paddingY={{ base: 5, lg: 5 }}
        backgroundColor={bg}
        width="100vw"
        maxWidth="100vw"
        margin={0}
        position={isFixed ? "fixed" : "static"}
        top={0}
      >
        <Logo />
        <SearchBar />
        <Navigation />
      </Container>
      {isFixed && <Box marginTop={100} />}
    </>
  );
};

export default Navbar;
