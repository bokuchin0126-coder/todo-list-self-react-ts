import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, Category } from "../components/types"

function useInitializeApp(todos: Todo[], categories: Category[], setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>, selectedDate: string,
    setEditingId: Dispatch<SetStateAction<string | null>>) {

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("todos")
          .select("*")

        if (error) throw error

        setTodos(data)
      } catch {
        setError("データの取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    const handleClick = () => {
      setEditingId(null)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])
}

export default useInitializeApp