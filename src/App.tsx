import { useState, useEffect } from 'react'
import type { Todo, Filter, View, Category, ApiTodo } from './types'
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
  const [editingId, setEditingId] = useState<string | null>(null)
  const [view, setView] = useState<View>("detail")
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories")
    return saved ? JSON.parse(saved) : []
  })
  const [selectCategoryId, setSelectCategoryId] = useState<string>("1")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    console.log(saved)
    if (saved && JSON.parse(saved).length > 0) {
      setTodos(JSON.parse(saved))
      setLoading(false)
      return
    }
    setLoading(true)
    console.log("最初")

    async function ApiTodo() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
        const date = await res.json()

        const conversion = date.map((item: ApiTodo) => ({
          id: item.id.toString(),
          text: item.title,
          status: item.completed ? "completed" : "active",
          categoryId: selectCategoryId
        }))
        setTodos(conversion)
        console.log(date)
      } catch(e) {
        setError("データの取得に失敗しました")
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    ApiTodo()
  }, [])

  const handleAddTodos = async (text: string) => {
    if (text.trim() === "") return 
    
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          title: text,
          completed: false
        })
      })
      const date = await res.json()
      
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text,
        status: "active",
        categoryId: selectCategoryId
      }

      setTodos(prev => [...prev, newTodo])
      setInputText("")
    } catch(e) {
      setError("リストの追加に失敗しました")
      console.log(e)
    } finally {
      setLoading(false)
      setError("")
    }
  }

  const handleToggle = async (id: string) => {
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return
    setLoading(true)

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          completed: todo.status !== "completed"
        })
      })
      const date = await res.json()

      setTodos(prev => prev.map(todo => (
        todo.id === id ? {...todo, status: todo.status === "completed" ? "active" : "completed"} : todo
      )))
    } catch {
      setError("更新に失敗しました")
    } finally {
      setLoading(false)
      setError("")
    }
  }
  
  const handleEdit = async (id: string, text: string) => {
    if (text.trim() === "") return 
    setLoading(true)

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method: "PATCH",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          title: text
        })
      })
      const date = await res.json()
      
      setTodos(prev => prev.map(todo => (
        todo.id === id ? {...todo, text: text} : todo
      )))
    } catch(e) {
      setError("保存に失敗しました")
    } finally {
      setLoading(false)
      setError("")
    }
  }

  const handleDeleteTodo = async (id: string) => {
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return
    setLoading(true)

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE"})

      const date = await res.json()

      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch {
      setError("消去に失敗しました")
    } finally {
      setLoading(false)
      setError("")
    }
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

  const categoriesTodos = filteredTodos.filter((todo) => todo.categoryId === selectCategoryId)

  const searchFilter = categoriesTodos.filter((todo) => {
    if (todo.text.toLowerCase().includes(searchText.toLowerCase())) return true
  })

  return (
    <>
      {view === "detail" ? 
        <TodoDetailView
          view={view}
          todos={todos}
          categories={categories}
          error={error}
          loading={loading}
          selectCategoryId={selectCategoryId}
          setView={setView}
          setCategories={setCategories}
          setSelectCategoryId={setSelectCategoryId}
          categoriesTodos={categoriesTodos}
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
          error={error}
          loading={loading}
          setInputText={setInputText}
          setSearchText={setSearchText}
          setFilter={setFilter}
          setEditingId={setEditingId}
          setView={setView}
          searchFilter={searchFilter}
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
