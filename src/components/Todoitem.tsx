import type { Todo } from './types'
import {useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from "../contexts/AppContext"

type Props = {
  todo: Todo
  editingId: (string | null)
  setEditingId: (id: string | null) => void
}

function Todoitem({todo, editingId, setEditingId}: Props) {

    const todoContext = useContext(AppContext)
    if (!todoContext) throw new Error("Context not found")
    const { handleDeleteTodos, handleToggleTodos, handleEditTodos } = todoContext

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
            <button className="completed" onClick={() => handleToggleTodos(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>

            {editingId === todo.id ? (
                <input
                  className="input-area"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter") {
                          handleEditTodos(todo.id, editText)
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
                handleEditTodos(todo.id, editText) 
                setEditingId(null)
              }}>
                保存
            </button>
            )}
            <button onClick={() => handleDeleteTodos(todo.id)}>消去</button>
          </div>
        </div>
      </>
    )
}

export default Todoitem