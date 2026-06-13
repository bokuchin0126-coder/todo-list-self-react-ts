import { useState } from "react"
import { supabase } from "../lib/supabase"
import type { Dispatch, SetStateAction } from "react"
import type { Todo } from "../components/types"

function useTodos(loading: boolean, setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>,
  errorTime: () => void) {

  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [selectCategoryId, setSelectCategoryId] = useState<string>("")

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date())

  const [selectedDate, setSelectedDate] = useState(today)
  const currentTodos = todos.filter(todo => todo.todoDate === selectedDate)

  const changeDate = (number: number) => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + number)

    const shiftDate = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date)

    if (shiftDate > today) return
    setSelectedDate(shiftDate)
  }

  const handleAddTodos = async () => {
    if (inputText.trim() === "") return 
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("todos")
        .insert({
          text: inputText,
          status: "active",
          category_id: selectCategoryId,
          todo_date: selectedDate
        })
        .select()

      if (error) throw error

      const newTodo = {
        id: data[0].id,
        text: data[0].text,
        status: data[0].status,
        categoryId: selectCategoryId,
        todoDate: data[0].todo_date
      }

      setTodos(prev => [...prev, newTodo])
      setInputText("")
    } catch {
      setError("リスト追加に失敗しました")
    } finally {
      setLoading(false)
      errorTime()
    }
  }

  const handleDeleteTodos = async (id: string) => {
    if (loading) return
    
    try {
      setLoading(true)
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)

      if (error) throw error
      setTodos(prev => prev.filter(todo => todo.id !== id))

    } catch {
      setError("データの消去に失敗しました")
    } finally {
      setLoading(false)
      errorTime()
    }
  }
  
  const handleToggleTodos = async (id: string) => {
    if (loading) return
    
    try {
      setLoading(true)
      const target = todos.find(todo => todo.id === id)

      if (!target) throw new Error("対象のリストが見つかりませんでした")
      const status = target.status === "completed" ? "active" : "completed"

      const { error } = await supabase
        .from("todos")
        .update({
          status: status
        })
        .eq("id", id)

      if (error) throw error
      setTodos(prev => prev.map(todo => (
        todo.id === id ? {...todo, status: status} : todo
      )))

    } catch {
      setError("データの更新に失敗しました")
    } finally {
      setLoading(false)
      errorTime()
    }
  }

  const handleEditTodos = async (id: string, text: string) => {
    if (text.trim() === "" ) return 
    try {
      setLoading(true)
      const { error } = await supabase
        .from("todos")
        .update({
          text: text
        })
        .eq("id", id)

      if (error) throw error
      setTodos(prev => prev.map(todo => (
        todo.id === id ? {...todo, text: text} : todo
      )))

    } catch {
      setError("編集に失敗しました")
    } finally {
      setLoading(false)
      errorTime()
    }
  }

  return {
    todos,
    inputText,
    currentTodos,
    selectCategoryId,
    today,
    selectedDate,
    setTodos,
    setInputText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleDeleteTodos,
    handleEditTodos,
    changeDate
  }

}

export default useTodos