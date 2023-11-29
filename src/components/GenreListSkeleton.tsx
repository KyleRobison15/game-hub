import { HStack, ListItem, Skeleton, SkeletonText } from "@chakra-ui/react";

const GenreListSkeleton = () => {
  return (
    <ListItem paddingY="10px">
      <HStack>
        <Skeleton borderRadius={8} boxSize="32px" />
        <SkeletonText width="125px" height="32px" />
      </HStack>
    </ListItem>
  );
};

export default GenreListSkeleton;
