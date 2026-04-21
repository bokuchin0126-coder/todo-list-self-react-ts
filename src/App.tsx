import { useState } from 'react'
import { useEffect } from 'react'
import type { Todo, Filter, View } from './types'
import TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [filter, setFilter] = useState<Filter>("all")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [view, setView] = useState<View>("detail")
  

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
      todo.id === id ? {...todo, text: text, isEditing: false} : todo
    )))
  }

  function search() {
    return todos.filter((todo) => todo.text.includes(searchText))
  }

  const filteredTodo = () => {
    const searched = search()
    if (filter === "all") return searched
    if (filter === "active")  return searched.filter((todo) => todo.status === "active")
    else if (filter === "completed") return searched.filter((todo) => todo.status === "completed")
    return searched
  }

  useEffect(() => {
    const handleClick = () => {
      setEditingId(null)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <>
      {view === "detail" ?
        <TodoDetailView
          view={view}
          setView={setView}
        />:
        <TodoListView
          todos={todos}
          view={view}
          setView={setView}
          filter={filter}
          inputText={inputText}
          searchText={searchText}
          editingId={editingId}
          setFilter={setFilter}
          setInputText={setInputText}
          setSearchText={setSearchText}
          setEditingId={setEditingId}
          filteredTodo={filteredTodo}
          handleAddTodos={handleAddTodos}
          onToggle={handleToggle}
          onEdit={handleEditTodos}
          />
      }
        
    </>
  )
}

export default App
