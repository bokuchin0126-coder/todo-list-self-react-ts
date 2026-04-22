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
  handleAddTodos: () => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string) => void
}

function TodoListView({todos, filter, view, inputText, searchText, editingId, setEditingId, setView, setFilter, setInputText, 
  setSearchText, filteredTodo, categorizeFilter, handleAddTodos, onToggle, onEdit}:Props) {

  return (
    <>
      <div>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodos()
            }
          }}
        />
      
      <button onClick={handleAddTodos}>追加</button>

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
          />
        ))}
        <button onClick={() => setView("detail")}>戻る</button>
      </div>
    </>
  )
}

export default TodoListView