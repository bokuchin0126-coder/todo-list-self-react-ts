import { useState } from 'react'
import type { Filter, View } from './components/types'
import useTodos from "./hooks/useTodos"
import useCategories from "./hooks/useCategories"
import useInitializeApp from "./hooks/useInitializeApp"
import TodoListView from './views/TodoListView'
import TodoDetailView from './views/TodoDetailView'
import './App.css'

function App() {
 
  const [filter, setFilter] = useState<Filter>("all")
  const [view, setView] = useState<View>("detail")
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
      <div className="container">
        {view === "detail" ?
          <TodoDetailView
            view={view}
            dailyTodos={dailyTodos}
            currentTodos={currentTodos}
            currentCategories={currentCategories}
            setView={setView}
            selectCategoryId={selectCategoryId}
            dailyCategories={dailyCategories}
            selectedDate={selectedDate}
            error={error}
            loading={loading}
            categoryText={categoryText}
            setSelectCategoryId={setSelectCategoryId}
            setCategoryText={setCategoryText}
            onAddCategories={handleAddCategories}
            onDeleteCategory={handleDeleteCategories}
            onChangeDate={changeDate}
          />:
          <TodoListView
            visibleTodos={visibleTodos}
            view={view}
            setView={setView}
            filter={filter}
            inputText={inputText}
            searchText={searchText}
            editingId={editingId}
            error={error}
            loading={loading}
            setFilter={setFilter}
            setInputText={setInputText}
            setSearchText={setSearchText}
            setEditingId={setEditingId}
            currentTodos={currentTodos}
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
