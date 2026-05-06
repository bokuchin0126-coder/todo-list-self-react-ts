import TodoItem from '../components/Todoitem'
import type { Todo, Filter, View } from '../types'

type Props = {
  todos: Todo[]
  inputText: string
  searchText: string
  filter: Filter
  editingId: (string | null)
  categoriesTodos: Todo[]
  error: string | null
  loading: boolean
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  setFilter: (filter: Filter) => void
  setEditingId: (id: string | null) => void
  setView: (view: View) => void
  searchFilter: Todo[]
  onAddTodos: (text: string) => void
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function TodoListView ({todos, inputText, searchText, filter, editingId, categoriesTodos, error, loading, setInputText, setSearchText, setFilter, setEditingId,
  setView, searchFilter, onAddTodos, onToggle, onEdit, onDelete}: Props) {

  return (
    <>
      <div>
        <div>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="検索..."
            />
          <p>{searchFilter.length === 0 ? "0件" : searchFilter.length + "/" + categoriesTodos.length}</p>
        </div>
        <div>
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="リストを追加..."
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onAddTodos(inputText)
                }
                }}/>
            <button onClick={() => onAddTodos(inputText)}>追加</button>
        </div>
        <div>
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