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
    const newTodo: Todo = {id: Date.now(), text: inputText, completed: "active", isEditing: false}
    setTodos([...todos, newTodo])
  }
  

  return (
    <>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      
      <button onClick={handleAddTodos}>追加</button>
      {todos.map((todo) => {
        return <div key={todo.id}>{todo.text}</div>
      })}
    </>
  )
}

export default App
