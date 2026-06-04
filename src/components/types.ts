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

export type Category = {
    id: string
    name: string
    isEditing: boolean
}

export type ApiTodo = {
    id: string
    title: string
    completed: boolean
}

export type Filter = "all" | "completed" | "active"