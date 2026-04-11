type status = "active" | "completed" 

export type Todo = {
    id: number
    text: string
    completed: status
    isEditing: boolean
}

export type filter = "all" | status 