import { useState } from "react"
import type { Category, Filter } from "../components/types"

function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories")
    return saved ? JSON.parse(saved) : []
  })

  const handleAddCategories = (text: string) => {
    if (text.trim() === "") return
    setCategories((prev) => [...prev, {id: crypto.randomUUID(), name: text}])
  }

  return {
    categories,
    setCategories,
    handleAddCategories
  }
}

export default useCategories