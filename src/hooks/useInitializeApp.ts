import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, Category } from "../components/types"
import { supabase } from "../lib/supabase"

function useInitializeApp(todos: Todo[], setCategories: Dispatch<SetStateAction<Category[]>>, selectCategoryId: number, setError: Dispatch<SetStateAction<string | null>>, 
  setLoading: Dispatch<SetStateAction<boolean>>, setTodos: Dispatch<SetStateAction<Todo[]>>, selectedDate: string, errorTime: () => void) {

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from("todos")
          .select("*")

        if (error) throw error
        if (!data) return

        const todos = data.map(todo => ({
          id: todo.id,
          text: todo.text,
          status: todo.status,
          categoryId: todo.category_id,
          createdAt: todo.created_at,
          todoDate: todo.todo_date
        }))

        setTodos(todos)
      } catch (e) {
        console.log(e)
      } finally {
        errorTime()
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("categories")
          .select("*")

        if (error) throw error
        setCategories(data.map(category => ({
          id: category.id,
          name: category.name,
          isEditing: false
        })))
      } catch {
        setError("データの取得に失敗しました")
      } finally {
        errorTime()
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    localStorage.setItem("selectCategoryId", String(selectCategoryId))
  }, [selectCategoryId])

}

export default useInitializeApp