import { createContext } from "react"
import type { Todo, DailyTodo } from "../components/types"

type AppContextType = {
    dailyTodos: DailyTodo[]
    error: string | null
    loading: boolean
    currentTodos: Todo[]
    handleToggleTodos: (id: string) => void
    handleEditTodos: (id: string, text: string) => void
    handleDeleteTodos: (id: string) => void
}

export const AppContext = createContext<null | AppContextType>(null)