import type { Category } from '../components/types' 
import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { AppContext } from "../contexts/AppContext"

type Props = {
  selectCategoryId: number
  selectedDate: string
  categories: Category[]
  categoryText: string
  setSelectCategoryId: (id: number) => void
  setCategoryText: (text: string) => void
  handleAddCategories: () => void
  handleEditCategories: (id: number, text: string, choice: "edit" | "keep") => void
  changeDate: (number: number) => void
}

function TodoDetailView ({selectedDate, selectCategoryId, categories, categoryText, setSelectCategoryId, setCategoryText,
  handleAddCategories, handleEditCategories, changeDate}: Props) {

    const context = useContext(AppContext)
    if (!context) throw new Error("AppContext not found")
    const { currentTodos } = context

  const categoryTodo = (categoryId: number) => {
    const category = currentTodos.filter((todo) => todo.categoryId === categoryId) ?? []
    const completed = category.filter((category) => category.status === "completed")
    return category.length === 0 ? 0 : Math.floor((completed.length / category.length) * 100)
  }

  const [editText, setEditText] = useState<string>("")
  
  return (
    <>
      <div className="date-control">
        <button onClick={() => changeDate(-1)}>←</button>
        <p>{selectedDate}</p>
        <button onClick={() => changeDate(1)}>→</button>
      </div>
      <div>
        <input
          value={categoryText}
          placeholder="カテゴリーを追加..."
          onChange={(e) => setCategoryText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCategories()
            }
          }}
        />
        <button onClick={handleAddCategories}>追加</button>
      </div>

      <div>
        {categories.map((category) => (
          <div key={category.id}>

            {category.isEditing ?
              <div>
                <input
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditCategories(category.id, editText, "keep")
                      setEditText("")
                    }
                  }}
                />
                <button onClick={() => {handleEditCategories(category.id, editText, "keep"), setEditText("")}}>
                  保存
                </button>
              </div>:

              <div>
                <Link to="/list">
                  <button
                    onClick={() => setSelectCategoryId(category.id)}>
                    {category.name}{categoryTodo(category.id)}%
                  </button>
                </Link>
                <button onClick={() => {handleEditCategories(category.id, "", "edit"), setEditText(category.name)}}>
                  編集
                </button>
              </div>}
          </div>
        ))}

        <Link to="/stats">達成率一覧</Link>
      </div>
    </>
  )
}

export default TodoDetailView