import { Button, VStack, Input } from "@chakra-ui/react";
import TodoItem from "../components/todoItem";
import axios from "axios";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchTodoList = async () => {
    const res = await axios.get("http://localhost:2000/todos");
    console.log(res.data.result);
    setTodoList(res.data.result);
  };

  const inputHandler = (event) => {
    const { value } = event.target;
    console.log(value);
    setInputValue(value);
  };
  const addTodoBtnHandler = async () => {
    const newData = {
      action: inputValue,
    };

    console.log("terklik");
    await axios.post("http://localhost:2000/todos", newData);
    fetchTodoList();
  };

  const deleteTodoHandler = async (id) => {
    await axios.delete(`http://localhost:2000/todos/${id}`);
    fetchTodoList();
  };

  const toggleChangeHandler = async (id) => {
    console.log(todoList);
    const dataToFind = todoList.find((val) => {
      return val.id == id;
    });

    console.log(dataToFind);
    const newStatus = {
      status: !dataToFind.status,
    };

    await axios.patch(`http://localhost:2000/todos/${id}`, newStatus);
    fetchTodoList();
  };

  const renderTodoList = () => {
    return todoList.map((val) => {
      return (
        <TodoItem
          action={val.action}
          status={val.status}
          deleteBtn={() => {
            deleteTodoHandler(val.id);
          }}
          editBtn={() => {
            toggleChangeHandler(val.id);
          }}
        />
      );
    });
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <VStack my="4">
      <Input onChange={inputHandler} placeholder="Your Action" width="lg" />
      <Button onClick={() => addTodoBtnHandler()}>New Todo</Button>
      {renderTodoList()}
    </VStack>
  );
};

export default TodoPage;
