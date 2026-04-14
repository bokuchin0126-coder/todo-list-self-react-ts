export type Todo = {
    id: number
    text: string
    status: "completed" | "active"
    isEditing: boolean
}

export type filter = "all" | "completed" | "active"