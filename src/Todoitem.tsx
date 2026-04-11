import type { Todo } from './types'
import { useState } from 'react'

type Props = {
    todo: Todo
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (id: number, newText: string) => void
}


export const Todoitem = ({ todo, onToggle, onDelete, onEdit }: Props) => {

  const [tempText, setTempText] = useState(todo.text)

  return (
    <div className="item">
      <button onClick={() => onToggle(todo.id)}>{todo.completed === "active" ? "□" : "☑"}</button>
      {todo.isEditing ? (
        <input 
          type="text"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEdit(todo.id, tempText)
            }
          }}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => onEdit(todo.id, todo.text)}>{todo.isEditing ? "保存" : "編集"}</button>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </div>
  )
}