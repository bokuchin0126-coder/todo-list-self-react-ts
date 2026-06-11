import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, Category } from "../components/types"
import { supabase } from "../lib/supabase"

function useInitializeApp(todos: Todo[], categories: Category[], selectCategoryId: string, setError: Dispatch<SetStateAction<string | null>>, 
  setLoading: Dispatch<SetStateAction<boolean>>, setTodos: Dispatch<SetStateAction<Todo[]>>, selectedDate: string) {

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

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
          categoryId: String(todo.category_id),
          createdAt: todo.created_at,
          todoDate: todo.todo_date
        }))

        setTodos(todos)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

}

export default useInitializeApp