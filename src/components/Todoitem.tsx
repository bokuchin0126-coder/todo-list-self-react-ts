import type { Todo } from '../types'
import {useState} from 'react'

type Props = {
  todo: Todo
  editingId: (number | null)
  setEditingId: (id: number | null) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string) => void
  onDelete: (id: number) => void
}

function Todoitem({todo, editingId, setEditingId, onToggle, onEdit, onDelete}: Props) {

    const [editText, setEditText] = useState<string>(todo.text)

    const changeEditingId = (id: number) => {
      if (!editingId) return setEditingId(id)
      else setEditingId(null)
    }

    return (
      <>
        <div>
          <button onClick={() => onToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>

          {editingId ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onEdit(todo.id, editText)
                        setEditingId(null)
                    }
                }}
              />
            ): (
            <span>{todo.text}</span>
          )}

          <button onClick={() => {onEdit(todo.id, editText), changeEditingId(todo.id)}}>{editingId ? "保存" : "編集"}</button>
          <button onClick={() => onDelete(todo.id)}>消去</button>
        </div>
      </>
    )
}

export default Todoitem