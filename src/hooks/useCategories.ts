import { useState } from "react"
import type { Category } from "../components/types"

function useCategories(setError: React.Dispatch<React.SetStateAction<string | null>>) {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories")
    return saved ? JSON.parse(saved) : []
  })

  const handleAddCategories = (text: string) => {
    if (text.trim() === "") return
    try {
      setCategories(prev => [...prev, {
        id: Date.now().toString(),
        name: text,
        isEditing: false
      }])
    } catch {
      setError("カテゴリの追加に失敗しました")
    } finally {
      setError(null)
    }
  }

  const handleEditCategories = (id: string, text: string, choose: "edit" | "keep") => {
    try {
      if (choose === "edit") {
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, isEditing: true} : category
        )))
      } else if (choose === "keep") {
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, name: text, isEditing: false} : category
        )))
      }
    } catch {
      setError("カテゴリの編集に失敗しました")
    } finally {
      setError(null)
    }
  }


  return {
    categories,
    setCategories,
    handleAddCategories,
    handleEditCategories
  }
}

export default useCategories