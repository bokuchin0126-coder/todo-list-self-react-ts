import { useState } from "react"
import type { Category, Filter, DailyTodo } from "../components/types"

function useCategories(setDailyTodos: React.Dispatch<React.SetStateAction<DailyTodo[]>>, today: string ) {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories")
    return saved ? JSON.parse(saved) : []
  })

  const handleAddCategories = (text: string) => {
    if (text.trim() === "") return
    setCategories((prev) => [...prev, {id: crypto.randomUUID(), name: text}])
  }

  const handleDeleteCategories = (id: string) => {
    const category = categories.filter(category => category.id === id)
    if (!category) return 

    setCategories(prev => prev.filter(category => category.id !== id))
    setDailyTodos(prev => prev.map(day => {
      if (day.date !== today) {
        return day
      }
      return {
        ...day,
        todos: day.todos.filter(todo => todo.categoryId !== id)
      }
    }))
  }

  return {
    categories,
    setCategories,
    handleAddCategories,
    handleDeleteCategories
  }
}

export default useCategories