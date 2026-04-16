import type { Todo } from './types'
import { useState } from 'react'

type Props = {
    todo: Todo
    onToggle: (id: number) => void
    onEdit: (id: number, text: string) => void
}

function TodoItem({ todo, onToggle, onEdit }: Props) {

  const [editText, setEditText] = useState<string>(todo.text)

    return (
      <>
      <div>
        <button onClick={() => onToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>
        {todo.isEditing ? (
          <input 
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdit(todo.id, editText)
              }
            }} />
          ) : todo.text}

          <button onClick={() => onEdit(todo.id, editText)}>{todo.isEditing ? "保存" : "編集"}</button>
      </div>
      </>
    )
}

export default TodoItem