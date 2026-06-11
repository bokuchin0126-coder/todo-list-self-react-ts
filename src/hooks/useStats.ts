import type { Todo } from "../components/types"

function useStats(today: string, todos: Todo[]) {

    const todayAchievement = () => {
        const todayTodos = todos.filter(todo => todo.todoDate === today)
        if (todayTodos.length === 0) return 0

        const completed = todayTodos.filter(todo => todo.status === "completed").length

        return Math.floor((completed / todayTodos.length) * 100)
    }

    const periodAchievement = (number: number) => {
        const date = new Date(today)
        date.setDate(date.getDate() - number)
        const endDate = new Date(today)

        const targetDate = todos.filter(todo => {
            const target = new Date(todo.todoDate)
            return target >= date && target <= endDate
        })
  
        const completed = targetDate.filter(todo => todo.status === "completed").length

        return Math.floor((completed / targetDate.length) * 100)
    }

    const continuousAchievement = () => {
        const date = new Date(today)
        let number = 0
        const formatter = new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })

        for (let i = 0; i < todos.length; i++) {
            const formatted = formatter.format(date)
            const targetTodos = todos.filter(todo => todo.todoDate === formatted)

            if (targetTodos.length === 0 && formatted !== today) {
                return number
            }

            const completed = targetTodos.filter(todo => todo.status === "completed").length
            const achievement = completed / targetTodos.length

            if (formatted === today) {
                if (achievement === 1) {
                    date.setDate(date.getDate() - 1)
                    number += 1
                } else {
                    date.setDate(date.getDate() - 1)
                    continue
                }
            }
            if (achievement === 1) {
                date.setDate(date.getDate() - 1)
                number += 1
            } else {
                return number
            }
        }
        return number
    }

    return {
        todayAchievement,
        periodAchievement,
        continuousAchievement
    }
}

export default useStats