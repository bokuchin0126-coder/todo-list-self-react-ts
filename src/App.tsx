import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { Filter, View } from './components/types'
import useTodos from "./hooks/useTodos"
import useCategories from "./hooks/useCategories"
import useInitializeApp from "./hooks/useInitializeApp"
import TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import { AppContext } from "./contexts/AppContext"
import './App.css'

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

  const stateCategories = useCategories(setDailyTodos, selectedDate)
  const {
    dailyCategories,
    categoryText,
    currentCategories,
    setCategoryText,
    handleAddCategories,
    handleDeleteCategories
  } = stateCategories

  const localStorage = useInitializeApp(dailyTodos, dailyCategories, setDailyTodos, setError, setLoading, selectedDate, setEditingId)

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
        error,
        loading,
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
            dailyTodos={dailyTodos}
            currentTodos={currentTodos}
            currentCategories={currentCategories}
            selectCategoryId={selectCategoryId}
            dailyCategories={dailyCategories}
            selectedDate={selectedDate}
            categoryText={categoryText}
            setSelectCategoryId={setSelectCategoryId}
            setCategoryText={setCategoryText}
            onAddCategories={handleAddCategories}
            onDeleteCategory={handleDeleteCategories}
            onChangeDate={changeDate}
          />} 
        />
        </Routes>

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
              currentTodos={currentTodos}
              onAddTodos={handleAddTodos}
          />}
        />
      </div>
    </AppContext.Provider>
    </>
  )
}

export default App
