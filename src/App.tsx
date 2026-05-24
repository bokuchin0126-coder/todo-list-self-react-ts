import { useState } from 'react'
import type { Filter, View } from './components/types'
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
    selectedDate,
    currentTodos,
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
    handleDeleteTodos,
    changeDate
  } = stateTodos

  const stateCategories = useCategories(setDailyTodos, selectedDate)
  const {
    dailyCategories,
    setDailyCategories,
    currentCategories,
    handleAddCategories,
    handleDeleteCategories
  } = stateCategories

  const localStorage = useInitializeApp(dailyTodos, dailyCategories, selectCategoryId, setError, setLoading, setDailyTodos, selectedDate)

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
      <div className="app">
        {view === "detail" ? 
          <TodoDetailView
            view={view}
            dailyTodos={dailyTodos}
            currentTodos={currentTodos}
            dailyCategories={dailyCategories}
            currentCategories={currentCategories}
            error={error}
            loading={loading}
            selectedDate={selectedDate}
            selectCategoryId={selectCategoryId}
            setView={setView}
            setDailyCategories={setDailyCategories}
            setSelectCategoryId={setSelectCategoryId}
            categoriesTodos={categoriesTodos}
            onAddCategories={handleAddCategories}
            onDeleteCategories={handleDeleteCategories}
            onChangeDate={changeDate}
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
      </div>
    </>
  )
}

export default App
