import { useState, useEffect } from 'react'
import type { Todo, Filter, View, Category } from './types'
import TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })
  const [inputText, setInputText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [filter, setFilter] = useState<Filter>("all")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [view, setView] = useState<View>("detail")
  const [selectCategoryId, setSelectCategoryId] = useState<number>(1)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryText, setCategoryText] = useState<string>("")
  
  useEffect(() => {
    const saved = localStorage.getItem("todos")

    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAddCategories = () => {
    if (categoryText.trim() === "") return
    setCategories((prev) => [...prev, {id: Date.now(), name: categoryText}])
    setCategoryText("")
  }

  const handleAddTodos = () => {
    if (inputText.trim() === "") return
    setTodos((prev) => [...prev, {id: Date.now(), text: inputText, status: "active", isEditing: false, categoryId: selectCategoryId }])
    setInputText("")
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
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
    return todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()))
  }

  const filteredTodo = () => {
    const searched = search()
    if (filter === "all") return searched
    if (filter === "active")  return searched.filter((todo) => todo.status === "active")
    else if (filter === "completed") return searched.filter((todo) => todo.status === "completed")
    return searched
  }

  const categorizeFilter = () => {
    const filter = filteredTodo()
    return filter.filter((todo) => todo.categoryId === selectCategoryId)
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
          selectCategoryId={selectCategoryId}
          categories={categories}
          categoryText={categoryText}
          setSelectCategoryId={setSelectCategoryId}
          setCategoryText={setCategoryText}
          onAddCategories={handleAddCategories}
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
          categorizeFilter={categorizeFilter}
          onAddTodos={handleAddTodos}
          onToggle={handleToggle}
          onEdit={handleEditTodos}
          onDelete={handleDeleteTodo}
          />
      }
        
    </>
  )
}

export default App
