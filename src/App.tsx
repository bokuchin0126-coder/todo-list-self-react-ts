import { useState } from 'react'
import type { Todo } from './types'
import type { filter } from './types'
import { Todoitem } from './Todoitem'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [filter, setFilter] = useState<filter>("all")

  const addTodo = () => {
    if (text.trim() === "") return
    
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: "active",
      isEditing: false
    }
    setTodos([...todos, newTodo])
    setText("")
  }

  const filtered = todos.filter((todo) => {
    const matchFilter = filter === "all" ? todos : todos.filter(todo => todo.completed === filter)
    const matchText = todo.text.toLowerCase().includes(searchText.toLowerCase())
    return matchFilter && matchText
  }) 

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: todo.completed === "active" ? "completed" : "active" } : todo
    ))
  }

  const editTodo = (id: number, newText: string) => {
    if (newText.trim() === "") return
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText, isEditing: !todo.isEditing } : todo
    ))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <>
      <div className="main">
        <input className="add-todo"
          key="todo-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo()
            }
          }}
          placeholder="入力する..."
        />
        <button onClick={addTodo}>追加</button>

        <input className="search-todo"
          key="search-input"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="検索する..."
        />
        <p>{filtered.length} / {todos.length}</p>
        <div className="filters">
          <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>全て</button>
          <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>未完了</button>
          <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>完了</button>
        </div>
      </div>

      <div className="list">
        {filtered.map((todo) => (
          <Todoitem 
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={editTodo}
          />
        ))}
      </div>
    </>
  )
}

export default App
