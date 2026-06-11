import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import type { Filter } from './components/types'
import useTodos from "./hooks/useTodos"
import useCategories from "./hooks/useCategories"
import useStats from "./hooks/useStats"
import useInitializeApp from "./hooks/useInitializeApp"
import  TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import TodoStatsView from './views/TodoStatsView'
import { AppContext } from "./contexts/AppContext"
import './App.css'

function App() {

  const [filter, setFilter] = useState<Filter>("all")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const stateTodos = useTodos(setError, setLoading)
  const {
    todos,
    today,
    selectedDate,
    currentTodos,
    editingId,
    inputText,
    searchText,
    selectCategoryId,
    setTodos,
    setEditingId,
    setInputText,
    setSearchText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleEditTodos,
    handleDeleteTodos,
    changeDate
  } = stateTodos

  const stateCategories = useCategories(setError)
  const {
    categories,
    handleAddCategories,
    handleEditCategories
  } = stateCategories

  const stats = useStats(today, todos)
  const {
    todayAchievement,
    periodAchievement,
    continuousAchievement
  } = stats

  const localStorage = useInitializeApp(todos, categories, selectCategoryId, setError, setLoading, setTodos, selectedDate)

  const filteredTodos = currentTodos.filter((todo) => {
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
    <AppContext.Provider
      value={{
        error,
        loading,
        handleDeleteTodos,
        handleToggleTodos,
        handleEditTodos
      }}
    >
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <TodoDetailView
                categories={categories}
                currentTodos={currentTodos}
                selectedDate={selectedDate}
                setSelectCategoryId={setSelectCategoryId}
                handleAddCategories={handleAddCategories}
                handleEditCategories={handleEditCategories}
                changeDate={changeDate}
              />}
            />
        
          <Route
            path="/list"
            element={
              <TodoListView
                inputText={inputText}
                searchText={searchText}
                editingId={editingId}
                categoriesTodos={categoriesTodos}
                setInputText={setInputText}
                setSearchText={setSearchText}
                setFilter={setFilter}
                setEditingId={setEditingId}
                searchFilter={searchFilter}
                handleAddTodos={handleAddTodos}
              />}
          />  

          <Route
            path="/stats"
            element={
              <TodoStatsView
                todayAchievement={todayAchievement}
                periodAchievement={periodAchievement}
                continuousAchievement={continuousAchievement}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
    </>
  )
}

export default App
