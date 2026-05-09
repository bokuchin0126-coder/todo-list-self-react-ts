import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, Category } from "../components/types"

function useCategories(setTodos: Dispatch<SetStateAction<Todo[]>>) {

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
    setTodos((prev) => prev.filter(todo => todo.categoryId !== id))
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