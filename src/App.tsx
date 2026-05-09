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
    todos,
    inputText,
    selectCategoryId,
    setTodos,
    setInputText,
    setSelectCategoryId,
    handleAddTodos,
    handleToggleTodos,
    handleEditTodos,
    handleDeleteTodos
  } = stateTodos

  const stateCategories = useCategories(setTodos)
  const {
    categories,
    categoryText,
    setCategoryText,
    handleAddCategories,
    handleDeleteCategories
  } = stateCategories

  const localStorage = useInitializeApp(todos, categories, setTodos, setError, setLoading, setEditingId)

  function search() {
    return todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()))
  }

  const filteredTodo = () => {
    const searched = search()
    if (filter === "all") return searched
    if (filter === "active")  return searched.filter((todo) => todo.status === "active")
    else if (filter === "completed") return searched.filter((todo) => todo.status === "completed")
    return searched
  }

  const categorizeFilter = () => {
    const list = filteredTodo()
    if (!selectCategoryId) return list
    return list.filter((todo) => todo.categoryId === selectCategoryId)
  }

  

  return (
    <>
      <div className="container">
        {view === "detail" ?
          <TodoDetailView
            view={view}
            todos={todos}
            setView={setView}
            selectCategoryId={selectCategoryId}
            categories={categories}
            error={error}
            loading={loading}
            categoryText={categoryText}
            setSelectCategoryId={setSelectCategoryId}
            setCategoryText={setCategoryText}
            onAddCategories={handleAddCategories}
            onDeleteCategory={handleDeleteCategories}
          />:
          <TodoListView
            todos={todos}
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
            filteredTodo={filteredTodo}
            categorizeFilter={categorizeFilter}
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
