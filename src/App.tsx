import { useState } from 'react'
import type { Todo } from './types'
import type { filter } from './types'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [filter, setFilter] = useState<filter>("all")

  const handleAddTodos = () => {
    if (inputText.trim() === "") return 
    setTodos((prev) => [...todos, {id: Date.now(), text: inputText, status: "active", isEditing: false}])
    setInputText("")
  }
  
  const handleToggle = (id: number) => {
    setTodos((prev) => prev.map(todo => (
      todo.id === id ? {...todo, status: todo.status === "active" ? "completed" : "active"} : todo
    )))
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
      {todos.map((todo) => {
        return <div key={todo.id}>{todo.text}
          <button onClick={() => handleToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>
        </div>
      })}
    </>
  )
}

export default App
