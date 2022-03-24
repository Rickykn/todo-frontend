import { Box, Button, Center, Text } from "@chakra-ui/react";

const TodoItem = ({ action, status, deleteBtn, editBtn }) => {
  return (
    <>
      <Box width="100%">
        <Center>
          <Box
            border="2px"
            borderRadius="2xl"
            width="50%"
            height={20}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="4"
          >
            <Text>{action}</Text>
            <Box>
              {status ? (
                <Button onClick={editBtn} colorScheme="teal" size="md">
                  Done
                </Button>
              ) : (
                <Button onClick={editBtn} colorScheme="blackAlpha" size="md">
                  Not Done
                </Button>
              )}
              <Button
                ml="2"
                colorScheme="pink"
                onClick={deleteBtn}
                className="mx-2"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default TodoItem;
