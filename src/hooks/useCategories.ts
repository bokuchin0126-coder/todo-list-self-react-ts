import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Category } from "../components/types"
import { supabase } from "../lib/supabase"
function useCategories(selectedDate: string, setError: Dispatch<SetStateAction<string | null>>, errorTime: () => void, setLoading: Dispatch<SetStateAction<boolean>>) {

  const [categories, setCategories] = useState<Category[]>([])
  const [categoryText, setCategoryText] = useState<string>("")

  
  const handleAddCategories = async () => {
    if (categoryText.trim() === "") return
   
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("catgories")
        .insert({
          name: categoryText
        })
        .select()

      if (error) throw error
      setCategories(prev => [...prev, {
        id: data[0].id,
        name: data[0].name,
        isEditing: false
      }])

    } catch {
      setError("カテゴリの追加に失敗しました")
    } finally {
      errorTime()
      setCategoryText("")
      setLoading(false)
    }
  }

  const handleEditCategories = async (id: number, text: string, choice: "edit" | "keep") => {
    try {
      setLoading(true)
      if (choice === "edit") {
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, isEditing: true} : category
        )))
      } 
      else if (choice === "keep") {
        const { error } = await supabase
          .from("categories")
          .update({
            name: text
          })

        if (error) throw error
        setCategories(prev => prev.map(category => (
          category.id === id ? {...category, name: text, isEditing: false} : category
        )))
      }
    } catch {
      setError("編集に失敗しました")
    } finally {
      errorTime()
      setLoading(false)
    }
  } 

  return {
    categories,
    setCategories,
    categoryText,
    setCategoryText,
    handleAddCategories,
    handleEditCategories
  }

}

export default useCategories