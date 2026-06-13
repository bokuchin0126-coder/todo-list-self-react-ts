export type Todo = {
    id: string
    text: string
    status: "completed" | "active"
    categoryId: string
    todoDate: string
}


export type Category = {
    id: string
    name: string
    isEditing: boolean
}


export type Filter = "all" | "completed" | "active"