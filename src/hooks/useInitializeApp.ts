import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, ApiTodo, Category } from "../components/types"

function useInitializeApp(todos: Todo[], categories: Category[], selectCategoryId: string, 
    setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>, setTodos: Dispatch<SetStateAction<Todo[]>>) {

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved && JSON.parse(saved).length > 0) {
      setTodos(JSON.parse(saved))
      setLoading(false)
      return
    }
    setLoading(true)

    async function ApiTodo() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
        const date = await res.json()

        const conversion = date.map((item: ApiTodo) => ({
          id: item.id.toString(),
          text: item.title,
          status: item.completed ? "completed" : "active",
          categoryId: selectCategoryId
        }))
        setTodos(conversion)
      } catch(e) {
        setError("データの取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }
    ApiTodo()
  }, [])

}

export default useInitializeApp