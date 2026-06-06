import type { DailyTodo } from '../components/types'

function useStats(today: string, dailyTodos: DailyTodo[]) {

    const todayAchievement = () => {
        const todayDate = dailyTodos.find(day => day.date === today)
        if (!todayDate) return 0

        const todayTodos = todayDate.todos
        const completed = todayTodos.filter(todo => todo.status === "completed").length

        return Math.floor((completed / todayTodos.length) * 100)
    }

    const periodAchievement = (number: number) => {
        const date = new Date(today)
        date.setDate(date.getDate() - number)

        const targetDate = dailyTodos.filter(day => {
            const target = new Date(day.date)
            const endDate = new Date(today)

            return endDate >= target && target >= date
        })
        const targetTodos = targetDate.flatMap(day => day.todos)
        const completed = targetTodos.filter(todo => todo.status === "completed").length

        return Math.floor((completed / targetTodos.length) * 100)
    }

    const continuousAchievement = () => {
        let number = 0
        const date = new Date(today)

        const formatter = new Intl.DateTimeFormat("jp-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
        })

        for (let i = 0; i < dailyTodos.length; i++) {
            const formatted = formatter.format(date)

            const targetDate = dailyTodos.find(day => day.date === formatted)
            if (!targetDate) {
                date.setDate(date.getDate() - 1)
                continue
            }
            const targetTodos = targetDate.todos

            if (targetTodos.length === 0) continue
            const completed = targetTodos.filter(todo => todo.status === "completed").length

            const achievement = completed / targetTodos.length

            if (formatted === today) {
                if (achievement === 1) {
                    number += 1
                    date.setDate(date.getDate() - 1)
                } else {
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