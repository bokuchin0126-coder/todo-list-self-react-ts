import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { DailyTodo, ApiTodo, Category } from "../components/types"

function useInitializeApp(dailyTodos: DailyTodo[], categories: Category[], selectCategoryId: string, setError: Dispatch<SetStateAction<string | null>>, 
  setLoading: Dispatch<SetStateAction<boolean>>, setDailyTodos: Dispatch<SetStateAction<DailyTodo[]>>, selectedDate: string) {

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(dailyTodos))
  }, [dailyTodos])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    setLoading(true)
    const saved = localStorage.getItem("todos")
    if (!saved) return setLoading(false)

    const parsed = JSON.parse(saved)
    const hasToday = parsed.some(
      (day: DailyTodo) => day.date === selectedDate
    )
    
    if (!hasToday) {
      async function ApiTodo() {
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
          const date = await res.json()

          const conversion = date.map((item: ApiTodo) => ({
            id: item.id.toString(),
            text: item.title,
            status: item.completed ? "completed" : "active",
            categoryId: selectCategoryId
          }))
          setDailyTodos([...parsed, {date: selectedDate, todos: conversion}])
        } catch(e) {
          setError("データの取得に失敗しました")
        } finally {
          setLoading(false)
        }
      }
      ApiTodo()
    } else if (hasToday) {
      setLoading(false)
      return
    } 
  }, [selectedDate])

}

export default useInitializeApp