import { createContext } from "react"
import type { Todo } from "../components/types"

type AppContextType = {
    todos: Todo[]
    error: string | null
    loading: boolean
    currentTodos: Todo[]
    handleToggleTodos: (id: string) => void
    handleEditTodos: (id: string, text: string) => void
    handleDeleteTodos: (id: string) => void
}

export const AppContext = createContext<null | AppContextType>(null)