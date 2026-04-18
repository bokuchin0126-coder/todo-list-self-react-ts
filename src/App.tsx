import { useState, useEffect } from 'react'
import type { Todo } from './types'
import type { filter } from './types'
import  TodoItem from './Todoitem'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [filter, setFilter] = useState<filter>("all")
  const [editingId, setEditingId] = useState<number | null>(null)
  

  const handleAddTodos = (text: string) => {
    if (text.trim() === "") return 

    const addTodo: Todo = {id: Date.now(), text: text, status: "active", isEditing: false}
    setTodos((prev) => [...prev, addTodo])
    setInputText("")
  }

  const handleToggle = (id: number) => {
    setTodos((prev) => prev.map(todo => (
      todo.id === id ? {...todo, status: todo.status === "active" ? "completed" : "active"} : todo
    )))
  }
  
  const handleEdit = (id: number, text: string) => {
    if (text.trim() === "") return 

    setTodos((prev) => prev.map(todo => (
      todo.id === id ? {...todo, text: text, isEditing: false} : todo
    )))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.status === "active"
    if (filter === "completed") return todo.status === "completed"
    return true
  })
  
  

  return (
    <>
      <div>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodos(inputText)
            }
          }}/>
          <button onClick={() => handleAddTodos(inputText)}>追加</button>
      </div>
      <div>
        <button onClick={() => setFilter("all")}>全て</button>
        <button onClick={() => setFilter("active")}>未達成</button>
        <button onClick={() => setFilter("completed")}>達成</button>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            setEditingId={setEditingId}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </>
  )
}

export default App
