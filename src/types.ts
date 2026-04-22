export type Todo = {
    id: number
    text: string
    status: "completed" | "active"
    isEditing: boolean
    categoryId: number
}

export type Category = {
    id: number
    name: string
}

export type View = "list" | "detail"

export type Filter = "all" | "completed" | "active"