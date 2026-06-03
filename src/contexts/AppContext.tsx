import { createContext } from "react"

type AppContextType = {
    error: string | null
    loading: boolean
    handleToggleTodos: (id: string) => void
    handleEditTodos: (id: string, text: string) => void
    handleDeleteTodos: (id: string) => void
}

export const AppContext = createContext<null | AppContextType>(null)