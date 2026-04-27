import TodoItem from '../components/Todoitem'
import type { Todo, Filter, View } from '../types'

type Props = {
  todos: Todo[]
  inputText: string
  searchText: string
  filter: Filter
  editingId: (number | null)
  categoriesTodos: Todo[]
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  setFilter: (filter: Filter) => void
  setEditingId: (id: number | null) => void
  setView: (view: View) => void
  filteredTodos: Todo[]
  onAddTodos: (text: string) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string) => void
  onDelete: (id: number) => void
}

function TodoListView ({todos, inputText, searchText, filter, editingId, categoriesTodos, setInputText, setSearchText, setFilter, setEditingId,
  setView, filteredTodos, onAddTodos, onToggle, onEdit, onDelete}: Props) {
  return (
    <>
      <div>
        <div>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="検索..."
            />
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
        {categoriesTodos.map(todo => (
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