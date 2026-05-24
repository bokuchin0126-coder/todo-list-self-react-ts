import { useState } from "react"
import type { Category, DailyTodo, DailyCategory } from "../components/types"

function useCategories(setDailyTodos: React.Dispatch<React.SetStateAction<DailyTodo[]>>, selectedDate: string ) {
  const [dailyCategories, setDailyCategories] = useState<DailyCategory[]>(() => {
    const saved = localStorage.getItem("categories")
    return saved ? JSON.parse(saved) : []
  })
  const currentDate = dailyCategories.find(day => day.date === selectedDate)
  const currentCategories = currentDate?.categories ?? []

  const handleAddCategories = (text: string) => {
    if (text.trim() === "") return
    if (!currentDate) {
      setDailyCategories(prev => [
        ...prev,
        {
          date: selectedDate,
          categories: [
            {
              id: Date.now().toString(),
              name: text
            }
          ]
        }
      ])
    } else {
      setDailyCategories(prev => prev.map(day => {
        if (day.date !== selectedDate) {
          return day
        }
        return {
          ...day,
          categories: [
            ...day.categories,
            {
              id: Date.now().toString(),
              name: text
            }
          ]
        }
      }))
    }
  }

  const handleDeleteCategories = (id: string) => {
    const category = currentCategories.filter(category => category.id === id)
    if (!category) return 

    setDailyCategories(prev => prev.map(day => {
      if (day.date !== selectedDate) {
        return day
      }
      return {
        ...day,
        categories: day.categories.filter(category => category.id !== id)
      }
    }))
    setDailyTodos(prev => prev.map(day => {
      if (day.date !== selectedDate) {
        return day
      }
      return {
        ...day,
        todos: day.todos.filter(todo => todo.categoryId !== id)
      }
    }))
  }

  return {
    dailyCategories,
    currentCategories,
    setDailyCategories,
    handleAddCategories,
    handleDeleteCategories
  }
}

export default useCategories