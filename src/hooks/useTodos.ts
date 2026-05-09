import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, Filter } from "../components/types"

function useTodos(setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })
  const [inputText, setInputText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectCategoryId, setSelectCategoryId] = useState<string>("1")

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

  const handleToggleTodos = async (id: string) => {
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
  
  const handleEditTodos = async (id: string, text: string) => {
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

  const handleDeleteTodos = async (id: string) => {
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
  return {
    todos,
    inputText,
    editingId,
    searchText,
    selectCategoryId,
    setTodos,
    setInputText,
    setEditingId,
    setSearchText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleEditTodos,
    handleDeleteTodos
  }
}

export default useTodos