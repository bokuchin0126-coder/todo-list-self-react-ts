import { createContext } from "react"

type AppContextType = {
    error: string | null
    loading: boolean
    handleDeleteTodos: (id: string) => void
    handleToggleTodos: (id: string) => void
    handleEditTodos: (id: string, text: string) => void
}

export const AppContext = createContext<AppContextType | null>(null)