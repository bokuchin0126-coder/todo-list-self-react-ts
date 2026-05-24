export type Todo = {
    id: string
    text: string
    status: "completed" | "active"
    categoryId: string
}

export type DailyTodo = {
    date: string
    todos: Todo[]
}

export type DailyCategory = {
    date: string
    categories: Category[]
}

export type Category = {
    id: string
    name: string
}

export type ApiTodo = {
    id: string
    title: string
    completed: boolean
}

export type View = "list" | "detail"

export type Filter = "all" | "completed" | "active"