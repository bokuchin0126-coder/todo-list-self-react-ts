import { createContext } from "react"

type AppContextType = {
    error: string | null
    loading: boolean
    handleDeleteTodos: (id: number) => void
    handleToggleTodos: (id: number) => void
    handleEditTodos: (id: number, text: string) => void
}

export const AppContext = createContext<AppContextType | null>(null)