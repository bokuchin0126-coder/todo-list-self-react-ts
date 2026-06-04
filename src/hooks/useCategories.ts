import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Category } from "../components/types"

function useCategories(selectedDate: string, setError: Dispatch<SetStateAction<string | null>>) {

  const [categories, setCategories] = useState<Category[]>(() => {
      const seved = localStorage.getItem("categories")
      return seved ? JSON.parse(seved) : []
    })
  const [categoryText, setCategoryText] = useState<string>("")

  
  const handleAddCategories = () => {
    if (categoryText.trim() === "") return
   
    try {
      setCategories(prev => [...prev, {
        id: Date.now().toString(),
        name: categoryText,
        isEditing: false
      }])
    } catch {
      setError("カテゴリの追加に失敗しました")
    } finally {
      setError(null)
      setCategoryText("")
    }
  }

  const handleEditCategories = (id: string, text: string, choice: "edit" | "keep") => {
    try {
      if (choice === "edit") {
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, isEditing: true} : category
        )))
      } else if (choice === "keep") {
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, name: text, isEditing: false} : category
        )))
      }
    } catch {
      setError("編集に失敗しました")
    } finally {
      setError(null)
    }
  } 

  return {
    categories,
    categoryText,
    setCategoryText,
    handleAddCategories,
    handleEditCategories
  }

}

export default useCategories