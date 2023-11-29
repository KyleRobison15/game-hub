import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const headingText = `${gameQuery.genre?.name || ""} ${
    gameQuery.platform?.name || ""
  } Games`;

  return (
    <Heading marginY={5} fontSize="5xl" as="h1">
      {headingText}
    </Heading>
  );
};

export default GameHeading;
