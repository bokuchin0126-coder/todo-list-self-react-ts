import { useState } from 'react'
import type { Todo } from './types'
import type { filter } from './types'
import  TodoItem  from './Todoitem'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [filter, setFilter] = useState<filter>("all")

  const handleAddTodos = () => {
    if (inputText.trim() === "") return
    setTodos((prev) => [...prev, {id: Date.now(), text: inputText, status: "active", isEditing: false}])
    setInputText("")
  }
  
  const handleToggle = (id: number) => {
    setTodos((prev) => prev.map(todo => (
      todo.id === id ? {...todo, status: todo.status === "active" ? "completed" : "active"} : todo
    )))
  }

  const handleEditTodos = (id: number, text: string) => {
    if (text.trim() === "" ) return 
    setTodos((prev) => prev.map(todo => (
      todo.id === id ? {...todo, text: text, isEditing: !todo.isEditing} : todo
    )))
  }

  const filteredTodo = () => {
    if (filter === "all") return todos
    if (filter === "active")  return todos.filter((todo) => todo.status === "active")
    else if (filter === "completed") return todos.filter((todo) => todo.status === "completed")
    return todos
  }

  return (
    <>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodos()
          }
        }}
      />
      
      <button onClick={handleAddTodos}>追加</button>

      <div>
        <button onClick={() => setFilter("all")}>全て</button>
        <button onClick={() => setFilter("completed")}>達成</button>
        <button onClick={() => setFilter("active")}>未達成</button>
      </div>

      {filteredTodo().map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onEdit={handleEditTodos}
          />
      ))}
    </>
  )
}

export default App
