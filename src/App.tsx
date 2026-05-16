import { useState, useEffect } from 'react'
import type { Todo, Filter, View, Category, ApiTodo } from './components/types'
import useTodos from "./hooks/useTodos"
import useCategories from "./hooks/useCategories"
import useInitializeApp from "./hooks/useInitializeApp"
import  TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import './App.css'

function App() {

  const [filter, setFilter] = useState<Filter>("all")
  const [view, setView] = useState<View>("detail")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const stateTodos = useTodos(setError, setLoading)
  const {
    dailyTodos,
    today,
    todayDate,
    todayTodos,
    editingId,
    inputText,
    searchText,
    selectCategoryId,
    setDailyTodos,
    setEditingId,
    setInputText,
    setSearchText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleEditTodos,
    handleDeleteTodos
  } = stateTodos

  const stateCategories = useCategories(setDailyTodos, today)
  const {
    categories,
    setCategories,
    handleAddCategories,
    handleDeleteCategories
  } = stateCategories

  const localStorage = useInitializeApp(dailyTodos, categories, selectCategoryId, setError, setLoading, setDailyTodos, today)

  const filteredTodos = todayTodos.filter((todo) => {
    if (filter === "active") return todo.status === "active"
    if (filter === "completed") return todo.status === "completed"
    return true
  })

  const categoriesTodos = filteredTodos.filter((todo) => todo.categoryId === selectCategoryId)

  const searchFilter = categoriesTodos.filter((todo) => {
    if (todo.text.toLowerCase().includes(searchText.toLowerCase())) return true
  })

  return (
    <>
      {view === "detail" ? 
        <TodoDetailView
          view={view}
          dailyTodos={dailyTodos}
          todayTodos={todayTodos}
          categories={categories}
          error={error}
          loading={loading}
          selectCategoryId={selectCategoryId}
          setView={setView}
          setCategories={setCategories}
          setSelectCategoryId={setSelectCategoryId}
          categoriesTodos={categoriesTodos}
          onAddCategories={handleAddCategories}
          onDeleteCategories={handleDeleteCategories}
        />
      :
        <TodoListView
          dailyTodos={dailyTodos}
          inputText={inputText}
          searchText={searchText}
          filter={filter}
          editingId={editingId}
          categoriesTodos={categoriesTodos}
          error={error}
          loading={loading}
          setInputText={setInputText}
          setSearchText={setSearchText}
          setFilter={setFilter}
          setEditingId={setEditingId}
          setView={setView}
          searchFilter={searchFilter}
          onAddTodos={handleAddTodos}
          onToggle={handleToggleTodos}
          onEdit={handleEditTodos}
          onDelete={handleDeleteTodos}
        />
      }
    </>
  )
}

export default App
