export type Todo = {
    id: number
    text: string
    status: "completed" | "active"
    categoryId: string
}

export type Category = {
    id: string
    name: string
}

export type SavedCategory = {
    id : number
    date: {}
}

export type View = "list" | "detail"

export type Filter = "all" | "completed" | "active"