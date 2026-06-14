import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Todo } from "../components/types"
import { supabase } from "../lib/supabase"

function useTodos(setError: Dispatch<SetStateAction<string | null>>, setLoading: Dispatch<SetStateAction<boolean>>, errorTime: () => void) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectCategoryId, setSelectCategoryId] = useState<number>(() => {
    const saved = localStorage.getItem("selectCategoryId")
    return saved ? Number(saved) : 0
  })
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

    const formatted = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date)
  
    if (formatted > today) return 

    setSelectedDate(formatted)
  }

  const handleAddTodos = async (text: string) => {
    if (text.trim() === "") return 
    setLoading(true)
    
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert({
          text: text,
          status: "active",
          category_id: selectCategoryId,
          todo_date: selectedDate
        })
        .select()

      if (error) throw error
      if (!data) throw error

      const newTodo: Todo = {
        id: data[0].id,
        text: data[0].text,
        status: data[0].status,
        categoryId: selectCategoryId,
        createdAt: data[0].created_at,
        todoDate: selectedDate
      }
      
      setTodos(prev => [...prev, newTodo])
      setInputText("")
    } catch(e) {
      setError("リストの追加に失敗しました")
      console.log(e)
    } finally {
      setLoading(false)
      setError("")
    }
  }

  const handleToggleTodos = async (id: number) => {
    setLoading(true)
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return 
    const status = todo.status === "completed" ? "active" : "completed"

    try {
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
      setError("更新に失敗しました")
    } finally {
      setLoading(false)
      setError("")
    }
  }
  
  const handleEditTodos = async (id: number, text: string) => {
    if (text.trim() === "") return 
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("todos")
        .update({
          text: text
        })
        .eq("id", id)
        .select()

      if (error) throw error

      setTodos(prev => prev.map(todo => (
        todo.id === id ? {...todo, text: data?.[0].text} : todo
      )))

    } catch(e) {
      setError("保存に失敗しました")
    } finally {
      setLoading(false)
      setError("")
    }
  }

  const handleDeleteTodos = async (id: number) => {
    const todo = currentTodos.find(todo => todo.id === id)
    if (!todo) return
    setLoading(true)

    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)

      if (error) throw error

      setTodos(prev => prev.filter(todo => todo.id !== id))

    } catch {
      setError("消去に失敗しました")
    } finally {
      setLoading(false)
      setError("")
    }
  }
  return {
    todos,
    today,
    selectedDate,
    currentTodos,
    inputText,
    editingId,
    searchText,
    selectCategoryId,
    setTodos,
    setInputText,
    setEditingId,
    setSearchText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleEditTodos,
    handleDeleteTodos,
    changeDate
  }
}

export default useTodos