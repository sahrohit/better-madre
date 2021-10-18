import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <Box
      onFocus={() => {
        setFormOpen(true);
      }}
      onBlur={() => {
        setFormOpen(false);
      }}
      marginX="1rem"
      mr="auto"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          opacity={formOpen ? "100%" : 0}
          width={{ base: "100%", lg: 240 }}
          type="text"
          placeholder="Search"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
