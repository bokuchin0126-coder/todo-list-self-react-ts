import { useState } from "react"
import type { Category } from "../components/types"
import { supabase } from "../lib/supabase"
function useCategories(setError: React.Dispatch<React.SetStateAction<string | null>>, errorTime: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  const [categories, setCategories] = useState<Category[]>([])

  const handleAddCategories = async (text: string) => {
    if (text.trim() === "") return
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("categories")
        .insert({
          name: text
        })
        .select()

      if (error) throw error
      setCategories(prev => [...prev, {
        id: data[0].ie,
        name: data[0].name,
        isEditing: false
      }])
    } catch {
      setError("カテゴリの追加に失敗しました")
    } finally {
      errorTime()
      setLoading(false)
    }
  }

  const handleEditCategories = async (id: number, text: string, choose: "edit" | "keep") => {
    try {
      if (choose === "edit") {
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, isEditing: true} : category
        )))
      } else if (choose === "keep") {
        const { error } = await supabase
          .from("categories")
          .update({
            name: text
          })
          .eq("id", id)

        if (error) throw error
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, name: text, isEditing: false} : category
        )))
      }
    } catch {
      setError("カテゴリの編集に失敗しました")
    } finally {
      errorTime()
      setLoading(false)
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