import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos: [],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
});

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("todos"));

        if (tasks && tasks.length > 0) {
            setTodos(tasks);
        }
    }, []);

    useEffect(() => {
        const tasks = JSON.stringify(todos);

        localStorage.setItem("todos", tasks);
    }, [todos]);



    const addTodo = (todo) => {
        setTodos((prev) => [...prev, { id: Date.now(), todo, completed: false }])
    };

    const updateTodo = (id, newTodo) => {
        setTodos((prev) => (
            prev.map((t) => (t.id === id ? { ...t, todo: newTodo } : t))
        ));
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos((prev) => (
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        ));
    };

    const value = {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo() {
    return useContext(TodoContext);
}

export default TodoContext;