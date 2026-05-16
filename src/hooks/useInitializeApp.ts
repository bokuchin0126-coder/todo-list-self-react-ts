import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { DailyTodo, Category, ApiTodo, Todo } from "../components/types"

function useInitializeApp(dailyTodos: DailyTodo[], categories: Category[], setDailyTodos: Dispatch<SetStateAction<DailyTodo[]>>, 
    setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>, today: string,
    setEditingId: Dispatch<SetStateAction<string | null>>) {

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    setLoading(true)
    if (saved) {
      setDailyTodos(JSON.parse(saved))
      setLoading(false)
      return 
    }
    const fetchDate = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        const date: ApiTodo[] = await res.json()

        const converted: Todo[] = date.map((item: ApiTodo) => ({
          id: item.id.toString(),
          text: item.title,
          status: item.completed ? "completed" : "active",
          categoryId: ""
        }))

        setDailyTodos([
          {
            date: today,
            todos: converted
          }
        ])
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
    localStorage.setItem("todos", JSON.stringify(dailyTodos))
  }, [dailyTodos])

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