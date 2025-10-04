import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "This is for testing",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

export function TodoProvider({children}){

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo(){
    return useContext(TodoContext);
}

export default TodoContext;