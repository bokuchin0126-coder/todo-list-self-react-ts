import type { Todo } from './types'
import { useState } from 'react'
import { useRef } from 'react'

type Props = {
    todo: Todo
    editingId: string | null
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>
    onToggle: (id: string) => void
    onEdit: (id: string, text: string) => void
    onDelete: (id: string) => void
}

function TodoItem({ todo, editingId, setEditingId, onToggle, onEdit, onDelete }: Props) {

  const [editText, setEditText] = useState<string>(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isEditing = editingId === todo.id

    return (
      <>
      <div ref={wrapperRef} className="todo-item">
        <button onClick={() => onToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>
        {isEditing ? (
          <input ref={inputRef}
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdit(todo.id, editText)
              }
            }} />
          ) : 
          <span className={todo.status === "completed" ? "completed" : ""}>
            {todo.text}
          </span>}

        {isEditing ? (
          <button onClick={() => { onEdit(todo.id, editText); setEditingId(null)}}>保存</button>
        ) : <button onClick={(e) => { e.stopPropagation(); setEditingId(todo.id) }}>編集</button> }
        <button onClick={() => onDelete(todo.id)}>消去</button>
      </div>
      </>
    )
}

export default TodoItem