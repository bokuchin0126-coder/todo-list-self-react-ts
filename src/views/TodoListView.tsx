import type { Todo, Filter, View } from '../types'
import TodoItem from '../components/Todoitem'

type Props = {
  todos: Todo[]
  view: View
  filter: Filter
  inputText: string
  searchText: string
  editingId: number | null
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>
  setView: (view: View) => void
  setFilter: (filter: Filter) => void
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  filteredTodo: () => Todo[]
  categorizeFilter: () => Todo[]
  onAddTodos: () => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string) => void
  onDelete: (id: number) => void
}

function TodoListView({todos, filter, view, inputText, searchText, editingId, setEditingId, setView, setFilter, setInputText, 
  setSearchText, filteredTodo, categorizeFilter, onAddTodos, onToggle, onEdit, onDelete}:Props) {

  return (
    <>
      <div>
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

      <div>
        <button onClick={() => setFilter("all")}>全て</button>
        <button onClick={() => setFilter("completed")}>達成</button>
        <button onClick={() => setFilter("active")}>未達成</button>
      </div>
      </div>

      <div>
        {categorizeFilter().map((todo) => (
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