import React from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = (props) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input width={250} type="text" placeholder="Search" />
    </InputGroup>
  );
};

export default SearchBar;
