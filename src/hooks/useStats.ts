import type { Todo } from '../components/types'

function useStats(today: string, todos: Todo[]) {

    const todayAchievement = () => {
        const todayTodos = todos.filter(todo => todo.todoDate === today)
        if (!todayTodos) return 0

        const completed = todayTodos.filter(todo => todo.status === "completed").length

        return Math.floor((completed / todayTodos.length) * 100)
    }

    const periodAchievement = (number: number) => {
        const date = new Date(today)
        date.setDate(date.getDate() - number)

        const targetTodos = todos.filter(todo => {
            const target = new Date(todo.todoDate)
            const endDate = new Date(today)

            return endDate >= target && target >= date
        })

        const completed = targetTodos.filter(todo => todo.status === "completed").length

        return Math.floor((completed / targetTodos.length) * 100)
    }

    const continuousAchievement = () => {
        let number = 0
        const date = new Date(today)

        const formatter = new Intl.DateTimeFormat("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
        })

        for (let i = 0; i < todos.length; i++) {
            const formatted = formatter.format(date)
            const targetTodos = todos.filter(todo => todo.todoDate === formatted)

            if (targetTodos.length === 0) {
                if (formatted === today) {
                  date.setDate(date.getDate() - 1)
                  continue
                } else {
                    return number
                }
            }
            const completed = targetTodos.filter(todo => todo.status === "completed").length

            const achievement = completed / targetTodos.length

            if (formatted === today) {
                if (achievement === 1) {
                    number += 1
                    date.setDate(date.getDate() - 1)
                } else {
                    date.setDate(date.getDate() - 1)
                    continue
                }
            } else if (achievement === 1) {
                number += 1
                date.setDate(date.getDate() - 1)
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