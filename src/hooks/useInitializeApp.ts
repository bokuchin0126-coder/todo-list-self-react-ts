import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo, Category, ApiTodo } from "../components/types"

function useInitializeApp(todos: Todo[], categories: Category[], setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>, setEditingId: Dispatch<SetStateAction<string | null>>) {

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
      setLoading(false)
      return 
    }
    const fetchDate = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        const date = await (res).json()

        const converted = date.map((item: ApiTodo) => ({
          id: item.id.toString(),
          text: item.title,
          status: item.completed ? "completed" : "active",
          categoryId: null
        }))

        setTodos(converted)
      } catch {
        setError("データの取得に失敗しました")
      } finally {
        setLoading(false)
        setError(null)
      }
    }
    fetchDate()
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

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