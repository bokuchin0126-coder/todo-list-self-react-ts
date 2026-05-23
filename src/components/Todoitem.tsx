import type { Todo } from './types'
import {useState, useEffect, useRef} from 'react'

type Props = {
  todo: Todo
  editingId: (string | null)
  setEditingId: (id: string | null) => void
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

function Todoitem({todo, editingId, setEditingId, onToggle, onEdit, onDelete}: Props) {

    const [editText, setEditText] = useState<string>("")
    const containerRef = useRef<HTMLDivElement | null>(null)

    const changeEditingId = (id: string) => {
      if (editingId === id) {
        setEditingId(null)
      } else {
        setEditingId(id)
      }
    }

    useEffect(() => {

      const handleClickOutside = (e: MouseEvent) => {

        if (editingId === todo.id && containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setEditText(todo.text)
          setEditingId(null)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [editingId, todo.id, todo.text])

    useEffect(() => {
      if (editingId === todo.id) {
        setEditText(todo.text)
      }
    }, [editingId])

    return (
      <>
        <div className="todo-item" ref={containerRef}>
          <div className="todo-main">
            <button className="completed" onClick={() => onToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>

            {editingId === todo.id ? (
                <input
                  className="input-area"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter") {
                          onEdit(todo.id, editText)
                          setEditingId(null)
                      }
                  }}
                />
              ): (
              <span className="todo-text">{todo.text}</span>
            )}
          </div>

          <div className="todo-actions">
            {editingId !== todo.id && (
              <button onClick={() => changeEditingId(todo.id)}>編集</button>
            )}

            {editingId === todo.id && (
              <button onClick={() => {
                onEdit(todo.id, editText) 
                setEditingId(null)
              }}>
                保存
            </button>
            )}
            <button onClick={() => onDelete(todo.id)}>消去</button>
          </div>
        </div>
      </>
    )
}

export default Todoitem