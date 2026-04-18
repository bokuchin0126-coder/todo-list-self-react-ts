import type { Todo } from './types'
import { useState } from 'react'
import { useRef } from 'react'

type Props = {
    todo: Todo
    editingId: number | null
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>
    onToggle: (id: number) => void
    onEdit: (id: number, text: string) => void
}

function TodoItem({ todo, editingId, setEditingId, onToggle, onEdit }: Props) {

  const [editText, setEditText] = useState<string>(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isEditing = editingId === todo.id

    return (
      <>
      <div ref={wrapperRef}>
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
          ) : todo.text}

        {isEditing ? (
          <button onClick={() => { onEdit(todo.id, editText); setEditingId(null)}}>保存</button>
        ) : <button onClick={(e) => { e.stopPropagation(); setEditingId(todo.id) }}>編集</button> }
      </div>
      </>
    )
}

export default TodoItem