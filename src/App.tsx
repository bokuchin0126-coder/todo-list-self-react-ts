import { useState, useEffect } from 'react'
import type { Todo, Filter, View, Category, ApiTodo } from './types'
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
  const [editingId, setEditingId] = useState<string | null>(null)
  const [view, setView] = useState<View>("detail")
  const [selectCategoryId, setSelectCategoryId] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>(() => {
    const seved = localStorage.getItem("categories")
    return seved ? JSON.parse(seved) : []
  })
  const [categoryText, setCategoryText] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
      setLoading(false)
      return 
    }
    const fetchDate = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        const date = await (res).json()

        const converted = date.map((item: ApiTodo) => ({
          id: item.id.toString(),
          text: item.title,
          status: item.completed ? "completed" : "active",
          categoryId: null
        }))

        setTodos(converted)
      } catch (e) {
        console.log("取得失敗", e)
      } finally {
        setLoading(false)
      }
    }
    fetchDate()
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const handleAddCategories = () => {
    if (categoryText.trim() === "") return
    setCategories((prev) => [...prev, {id: Date.now().toLocaleString(), name: categoryText}])
    setCategoryText("")
  }

  const handleAddTodos = async () => {
    if (inputText.trim() === "") return 
    if (loading) return
    setLoading(true)

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputText,
          completed: false
        })
      })
      const date = await res.json()

      const newTodo: Todo = {
        id: Date.now().toString(),
        text: date.title,
        status: "active",
        categoryId: selectCategoryId
      }

      setTodos(prev => {
        const next = [...prev, newTodo]
        localStorage.setItem("todos", JSON.stringify(next))
        return next
      })
      setInputText("")

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    if (loading) return
    setLoading(true)

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE"
      })
      setTodos(prev => {
        const next = prev.filter(todo => todo.id !== id)
        localStorage.setItem("todos", JSON.stringify(next))
        return next
      })

    } catch (e) {
      console.log("消去失敗", e)
    } finally {
      setLoading(false)
    }
  }
  
  const handleToggle = async (id: string) => {
    if (loading) return
    setLoading(true)

    try {
      const target = todos.find(t => t.id === id)
      if (!target) return

      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed: target.status !== "completed"
        })
      })
      const date = await res.json()

      const updateTodo: Todo = {
        id: id,
        text: date.title ?? target.text,
        status: date.completed ? "completed" : "active",
        categoryId: target.categoryId
      }
     setTodos((prev: Todo[]) => {
      const next = prev.map(todo => (
        todo.id === id ? updateTodo : todo
      ))
      localStorage.setItem("todos", JSON.stringify(next))
      return next
     })

    } catch {
      console.log("更新失敗")
    } finally {
      setLoading(false)
    }
  }

  const handleEditTodos = (id: string, text: string) => {
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
    const list = filteredTodo()
    if (!selectCategoryId) return list
    return list.filter((todo) => todo.categoryId === selectCategoryId)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter(category => category.id !== id))
    setTodos((prev) => prev.filter(todo => todo.categoryId !== id))
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
      <div className="container">
        {view === "detail" ?
          <TodoDetailView
            view={view}
            todos={todos}
            setView={setView}
            selectCategoryId={selectCategoryId}
            categories={categories}
            categoryText={categoryText}
            setSelectCategoryId={setSelectCategoryId}
            setCategoryText={setCategoryText}
            onAddCategories={handleAddCategories}
            onDeleteCategory={handleDeleteCategory}
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
      </div>
        
    </>
  )
}

export default App
