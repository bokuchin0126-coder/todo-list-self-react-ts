import type { Todo } from './types'
import { useState, useEffect } from 'react'
import { useRef } from 'react'

type Props = {
    todo: Todo
    editingId: number | null
    setEditingId: (id: number | null) => void
    onToggle: (id: number) => void
    onEdit: (id: number, text: string) => void
}

function TodoItem({ todo, editingId, setEditingId, onToggle, onEdit}: Props) {

  const [editText, setEditText] = useState<string>(todo.text)
  const isEditing = editingId === todo.id
  const editRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    editRef.current?.focus()
  }, [isEditing])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)){
        setEditingId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditing])

    return (
      <>
        <div>
          <button onClick={() => onToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>
          {isEditing ? (
            <input ref={editRef}
              id="auto-focus"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEdit(todo.id, editText)
                  setEditingId(null)
                }
              }}/>
          ): todo.text}

          {isEditing ? 
          <button onClick={(e) => {e.stopPropagation(), onEdit(todo.id, editText), setEditingId(null)}}>保存</button>
          : <button onClick={(e) => {e.stopPropagation(), setEditingId(todo.id) }}>編集</button>}
        </div>
      </>
    )
}

export default TodoItem