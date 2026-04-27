import { useState, useEffect } from 'react'
import type { Todo, Filter, View, Category } from './types'
import  TodoListView from './views/TodoListView'
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
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories")
    return saved ? JSON.parse(saved) : []
  })
  const [selectCategoryId, setSelectCategoryId] = useState<string>("1")
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const handleAddTodos = (text: string) => {
    if (text.trim() === "") return 

    const addTodo: Todo = {id: Date.now(), text: text, status: "active", categoryId: selectCategoryId}
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
      todo.id === id ? {...todo, text: text} : todo
    )))
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }

  const handleAddCategories = (text: string) => {
    if (text.trim() === "") return
    setCategories((prev) => [...prev, {id: crypto.randomUUID(), name: text}])
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.status === "active"
    if (filter === "completed") return todo.status === "completed"
    return true
  })

  const searchFilter = filteredTodos.filter((todo) => {
    if (todo.text.toLowerCase().includes(searchText.toLowerCase())) return true
  })

  const categoriesTodos = searchFilter.filter((todo) => todo.categoryId === selectCategoryId)

  return (
    <>
      {view === "detail" ? 
        <TodoDetailView
          view={view}
          categories={categories}
          selectCategoryId={selectCategoryId}
          setView={setView}
          setCategories={setCategories}
          setSelectCategoryId={setSelectCategoryId}
          onAddCategories={handleAddCategories}
        />
      :
        <TodoListView
          todos={todos}
          inputText={inputText}
          searchText={searchText}
          filter={filter}
          editingId={editingId}
          categoriesTodos={categoriesTodos}
          setInputText={setInputText}
          setSearchText={setSearchText}
          setFilter={setFilter}
          setEditingId={setEditingId}
          setView={setView}
          filteredTodos={filteredTodos}
          onAddTodos={handleAddTodos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDeleteTodo}
        />
      }
    </>
  )
}

export default App
