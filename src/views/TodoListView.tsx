import type { DailyTodo, Filter, View, Todo } from '../components/types'
import TodoItem from '../components/Todoitem'
import { memo } from "react"

type Props = {
  visibleTodos: Todo[]
  view: View
  filter: Filter
  inputText: string
  searchText: string
  editingId: string | null
  error: string | null
  loading: true | false
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>
  setView: (view: View) => void
  setFilter: (filter: Filter) => void
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  currentTodos: Todo[]
  onAddTodos: () => void
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function TodoListView({visibleTodos, filter, view, inputText, error, loading, searchText, editingId, setEditingId, setView, setFilter, setInputText, 
  currentTodos, setSearchText, onAddTodos, onToggle, onEdit, onDelete}:Props) {

  
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
              onAddTodos()
            }
          }}
        />
      
      <button onClick={onAddTodos}>追加</button>
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
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          />
        ))}
        <button onClick={() => setView("detail")}>戻る</button>
      </div>
    </>
  )
}

export default TodoListView