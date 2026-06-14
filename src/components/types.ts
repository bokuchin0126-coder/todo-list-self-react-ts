export type Todo = {
    id: number
    text: string
    status: "completed" | "active"
    categoryId: number
    todoDate: string
}


export type Category = {
    id: number
    name: string
    isEditing: boolean
}


export type Filter = "all" | "completed" | "active"