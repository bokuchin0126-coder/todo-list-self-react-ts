import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { Filter } from './components/types'
import useTodos from "./hooks/useTodos"
import useCategories from "./hooks/useCategories"
import useStats from "./hooks/useStats"
import useInitializeApp from "./hooks/useInitializeApp"
import TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import { AppContext } from "./contexts/AppContext"
import './App.css'
import TodoStatsView from './views/TodoStatsView'

function App() {
 
  const [filter, setFilter] = useState<Filter>("all")
  const [searchText, setSearchText] = useState<string>("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const stateTodos = useTodos(loading, setError, setLoading)
  const {
    dailyTodos,
    inputText,
    selectCategoryId,
    today,
    currentDate,
    currentTodos,
    selectedDate,
    setDailyTodos,
    setInputText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleEditTodos,
    handleDeleteTodos,
    changeDate
  } = stateTodos

  const stateCategories = useCategories(selectedDate, setError)
  const {
    categories,
    categoryText,
    setCategoryText,
    handleAddCategories,
    handleEditCategories
  } = stateCategories

  const stats = useStats(today, dailyTodos)
  const {
    todayAchievement,
    periodAchievement,
    continuousAchievement
  } = stats

  const localStorage = useInitializeApp(dailyTodos, categories, setDailyTodos, setError, setLoading, selectedDate, setEditingId)

  function search() {
    return currentTodos.filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()))
  }

  const filteredTodo = () => {
    const searched = search()

    if (filter === "all") return searched
    if (filter === "active")  return searched.filter((todo) => todo.status === "active")
    else if (filter === "completed") return searched.filter((todo) => todo.status === "completed")
    return searched
  }

  const categorizeFilter = () => {
    const filteredTodos = filteredTodo()
    return filteredTodos.filter((todo) => todo.categoryId === selectCategoryId)
  }
  const visibleTodos = categorizeFilter()

  

  return (
    <>
    <AppContext.Provider
      value={{
        dailyTodos,
        error,
        loading,
        currentTodos,
        handleToggleTodos,
        handleEditTodos,
        handleDeleteTodos
      }}
    >
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={<TodoDetailView 
              selectCategoryId={selectCategoryId}
              categories={categories}
              selectedDate={selectedDate}
              categoryText={categoryText}
              setSelectCategoryId={setSelectCategoryId}
              setCategoryText={setCategoryText}
              handleAddCategories={handleAddCategories}
              handleEditCategories={handleEditCategories}
              changeDate={changeDate}
            />} 
          />
      
          <Route 
            path="/list"
            element={
              <TodoListView
                visibleTodos={visibleTodos}
                filter={filter}
                inputText={inputText}
                searchText={searchText}
                editingId={editingId}
                setFilter={setFilter}
                setInputText={setInputText}
                setSearchText={setSearchText}
                setEditingId={setEditingId}
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
              />}
          />
        </Routes>

      </div>
    </AppContext.Provider>
    </>
  )
}

export default App
