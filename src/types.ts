export type Todo = {
    id: number
    text: string
    status: "completed" | "active"
    isEditing: boolean
}

export type View = "list" | "detail"

export type Filter = "all" | "completed" | "active"