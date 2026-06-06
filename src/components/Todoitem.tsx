import type { Todo } from './types'
import { useState } from 'react'
import { useRef } from 'react'
import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"

type Props = {
    todo: Todo
    editingId: string | null
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>
}

function TodoItem({ todo, editingId, setEditingId }: Props) {

  const [editText, setEditText] = useState<string>(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isEditing = editingId === todo.id

  const context = useContext(AppContext)
  if (!context) throw new Error("AppContext not found")
  const { handleToggleTodos, handleDeleteTodos, handleEditTodos} = context

    return (
      <>
      <div ref={wrapperRef} className="todo-item">
        <button onClick={() => handleToggleTodos(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>
        {isEditing ? (
          <input ref={inputRef}
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditTodos(todo.id, editText)
                setEditingId(null)
              }
            }} />
          ) : 
          <span className={todo.status === "completed" ? "completed" : ""}>
            {todo.text}
          </span>}

        {isEditing ? (
          <button onClick={() => { handleEditTodos(todo.id, editText); setEditingId(null)}}>保存</button>
        ) : <button onClick={(e) => { e.stopPropagation(); setEditingId(todo.id) }}>編集</button> }
        <button onClick={() => handleDeleteTodos(todo.id)}>消去</button>
      </div>
      </>
    )
}

export default TodoItem