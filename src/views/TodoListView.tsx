import type { DailyTodo, Filter, Todo } from '../components/types'
import { Link } from "react-router-dom"
import TodoItem from '../components/Todoitem'
import { memo, useContext } from "react"
import { AppContext } from "../contexts/AppContext"

type Props = {
  visibleTodos: Todo[]
  filter: Filter
  inputText: string
  searchText: string
  editingId: string | null
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>
  setFilter: (filter: Filter) => void
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  currentTodos: Todo[]
  handleAddTodos: () => void
}

function TodoListView({visibleTodos, filter, inputText, searchText, editingId, setEditingId, setFilter, setInputText, 
  currentTodos, setSearchText, handleAddTodos}:Props) {

    const context = useContext(AppContext)
    if (!context) return null
    const { error, loading } = context
  
  return (
    <>
      <div className="input-group">
        <input
          value={searchText}
          placeholder="検索する..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        
        <input
          value={inputText}
          placeholder="リストを追加する..."
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodos()
            }
          }}
        />
      
      <button onClick={handleAddTodos}>追加</button>
      </div>

      <div className="filter-group">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>全て</button>
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("completed")}>達成</button>
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("active")}>未達成</button>
      </div>
      {currentTodos.length === 0 && <p>タスクがありません</p>} 
      {loading && <p>ローディング中...</p>}
      {error && <p>{error}</p>}
      
      <div>
        {visibleTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          setEditingId={setEditingId}
          />
        ))}

        <Link to="/">
        <button>戻る</button>
        </Link>

      </div>
    </>
  )
}

export default TodoListView