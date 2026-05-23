import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { DailyTodo, Category } from "../components/types"

function useCategories(setDailyTodos: Dispatch<SetStateAction<DailyTodo[]>>, selectedDate: string) {

  const [categories, setCategories] = useState<Category[]>(() => {
      const seved = localStorage.getItem("categories")
      return seved ? JSON.parse(seved) : []
    })
  const [categoryText, setCategoryText] = useState<string>("")
  
  const handleAddCategories = () => {
    if (categoryText.trim() === "") return
    setCategories((prev) => [...prev, {id: Date.now().toLocaleString(), name: categoryText}])
    setCategoryText("")
  }

  const handleDeleteCategories = (id: string) => {
    setCategories((prev) => prev.filter(category => category.id !== id))
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
    categories,
    categoryText,
    setCategoryText,
    handleAddCategories,
    handleDeleteCategories
  }

}

export default useCategories