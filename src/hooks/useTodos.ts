import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo } from "../components/types"

function useTodos(loading: boolean, setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>) {

  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })
  const [inputText, setInputText] = useState<string>("")
  const [selectCategoryId, setSelectCategoryId] = useState<string>("")

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

      setTodos(prev => [...prev, newTodo])
    
      setInputText("")

    } catch {
      setError("リスト追加に失敗しました")
    } finally {
      setLoading(false)
      setError(null)
    }
  }

  const handleDeleteTodos = async (id: string) => {
    if (loading) return
    setLoading(true)

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE"
      })
      setTodos(prev => prev.filter(todo => todo.id !== id))

    } catch {
      setError("データの消去に失敗しました")
    } finally {
      setLoading(false)
      setError(null)
    }
  }
  
  const handleToggleTodos = async (id: string) => {
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
     setTodos((prev: Todo[]) => prev.map(todo => (
        todo.id === id ? updateTodo : todo
      )))
    

    } catch {
      setError("データの更新に失敗しました")
    } finally {
      setLoading(false)
      setError(null)
    }
  }

  const handleEditTodos = (id: string, text: string) => {
    if (text.trim() === "" ) return 
    setTodos((prev) => prev.map(todo => (
      todo.id === id ? {...todo, text: text, isEditing: false} : todo
    )))
  }

  return {
    todos,
    inputText,
    selectCategoryId,
    setTodos,
    setInputText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleDeleteTodos,
    handleEditTodos
  }

}

export default useTodos