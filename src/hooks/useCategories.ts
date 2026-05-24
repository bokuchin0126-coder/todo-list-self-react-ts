import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { DailyTodo, DailyCategory } from "../components/types"

function useCategories(setDailyTodos: Dispatch<SetStateAction<DailyTodo[]>>, selectedDate: string) {

  const [dailyCategories, setDailyCategories] = useState<DailyCategory[]>(() => {
      const seved = localStorage.getItem("categories")
      return seved ? JSON.parse(seved) : []
    })
  const [categoryText, setCategoryText] = useState<string>("")
  const currentDay = dailyCategories.find(day => day.date === selectedDate)
  const currentCategories = currentDay?.categories ?? []
  
  const handleAddCategories = () => {
    if (categoryText.trim() === "") return
    if (!currentDay) {
      setDailyCategories(prev => [
        ...prev,
        {
          date: selectedDate,
          categories: [
            {
              id: Date.now().toString(),
              name: categoryText
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
              name: categoryText
            }
          ]
        }
      }))
    }
    setCategoryText("")
  }

  const handleDeleteCategories = (id: string) => {
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
    categoryText,
    currentCategories,
    setCategoryText,
    handleAddCategories,
    handleDeleteCategories
  }

}

export default useCategories