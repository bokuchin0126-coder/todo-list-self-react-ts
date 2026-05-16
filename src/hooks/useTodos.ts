import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { DailyTodo, Todo } from "../components/types"

function useTodos(loading: boolean, setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>) {

  const [dailyTodos, setDailyTodos] = useState<DailyTodo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })
  const [inputText, setInputText] = useState<string>("")
  const [selectCategoryId, setSelectCategoryId] = useState<string>("")

  const today = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date())

  const todayDate = dailyTodos.find(day => day.date === today)

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

      if (todayDate) {
        setDailyTodos(prev => prev.map(day => {
          if (day.date !== today) {
            return day
          }
          return {
            ...day,
            todos: [...day.todos, newTodo]
          }
        }))
      } else {
        setDailyTodos(prev => [
          ...prev,
          {
            date: today,
            todos: [newTodo]
          }
        ])
      }
    
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
      setDailyTodos(prev => prev.map(day => {
        if (day.date !== today) {
          return day
        }
        return {
          ...day,
          todos: day.todos.filter(todo => todo.id !== id)
        }
      }))

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
      if (!todayDate) return
      const target = todayDate.todos.find(t => t.id === id)
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

     setDailyTodos(prev => prev.map(day => {
      if (day.date !== today) {
        return day
      }
      return {
        ...day,
        todos: day.todos.map(todo => 
          todo.id === id ? {...todo, status: todo.status === "completed" ? "active" : "completed"} 
          : todo)
      }
     }))
    } catch {
      setError("データの更新に失敗しました")
    } finally {
      setLoading(false)
      setError(null)
    }
  }

  const handleEditTodos = async (id: string, text: string) => {
    if (text.trim() === "" ) return 
    try {
      setLoading(true)
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          title: text
        })
      })
      const date = await res.json()
      setDailyTodos(prev => prev.map(day => {
        if (day.date !== today) {
          return day
        }
        return {
          ...day,
          todos: day.todos.map(todo => (
            todo.id === id ? {...todo, text: date.title} : todo
          ))
        }
      }))
    } catch {
      setError("編集に失敗しました")
    } finally {
      setError(null)
      setLoading(false)
    }
  }

  return {
    dailyTodos,
    inputText,
    selectCategoryId,
    today,
    todayDate,
    setDailyTodos,
    setInputText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleDeleteTodos,
    handleEditTodos
  }

}

export default useTodos