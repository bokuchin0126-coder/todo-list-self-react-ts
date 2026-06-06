import TodoItem from '../components/Todoitem'
import type { Todo, Filter } from '../components/types'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"

type Props = {
  inputText: string
  searchText: string
  editingId: (string | null)
  categoriesTodos: Todo[]
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  setFilter: (filter: Filter) => void
  setEditingId: (id: string | null) => void
  searchFilter: Todo[]
  handleAddTodos: (text: string) => void
}

function TodoListView ({inputText, searchText, editingId, categoriesTodos, setInputText, setSearchText, setFilter, setEditingId,
  searchFilter, handleAddTodos}: Props) {

    const todoContext = useContext(AppContext)
    if (!todoContext) throw new Error("Context not found")
    const { error, loading } = todoContext

  return (
    <>
      <div className="todo-container">
        <div>
          <input
            className="input-area"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="検索..."
            />
          <p>{searchFilter.length === 0 ? "0件" : searchFilter.length + "/" + categoriesTodos.length}</p>
        </div>
        <div>
            <input
                className="input-area"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="リストを追加..."
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleAddTodos(inputText)
                }
                }}/>
            <button className="app-button" onClick={() => handleAddTodos(inputText)}>追加</button>
        </div>
        <div className="filter-buttons">
            <button onClick={() => setFilter("all")}>全て</button>
            <button onClick={() => setFilter("active")}>未達成</button>
            <button onClick={() => setFilter("completed")}>達成</button>
        </div>
        {error && <p>{error}</p>}
        {loading && <p>ローディング中...</p>}
          {searchFilter.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))}
        </div>
        <Link to="/">戻る</Link>
    </>
  )
}

export default TodoListView