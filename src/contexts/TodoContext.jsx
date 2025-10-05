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
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));

        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    useEffect(()=> {
        const todos = JSON.stringify(todos);

        localStorage.setItem("todos", todos);
    }, [todos]);

    const [todos, setTodos] = useState([
        {
            id: 1,
            todo: "This is for testing",
            completed: false,
        }
    ]);

    const addTodo = (todo) => {
        setTodos((prev) => [...prev, { id: Date.now(), todo, completed: false }])
    };

    const updateTodo = (id, newTodo) => {
        setTodos((prev) => (
            prev.map((t) => (t.id === id ? { ...t, todo: newTodo } : t))
        ));
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter(prev.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos((prev) => (
            prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
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