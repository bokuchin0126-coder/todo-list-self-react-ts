import { createContext } from "react"
import type { Todo } from "../components/types"

type AppContextType = {
    todos: Todo[]
    error: string | null
    loading: boolean
    currentTodos: Todo[]
    handleToggleTodos: (id: number) => void
    handleEditTodos: (id: number, text: string) => void
    handleDeleteTodos: (id: number) => void
}

export const AppContext = createContext<null | AppContextType>(null)