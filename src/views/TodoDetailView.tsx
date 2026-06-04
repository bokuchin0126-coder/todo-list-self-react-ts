import type { DailyTodo, Category, Todo } from '../components/types' 
import { useState } from 'react'
import { Link } from "react-router-dom"

type Props = {
  dailyTodos: DailyTodo[]
  currentTodos: Todo[]
  selectCategoryId: string
  selectedDate: string
  categories: Category[]
  categoryText: string
  setSelectCategoryId: (id: string) => void
  setCategoryText: (text: string) => void
  handleAddCategories: () => void
  handleEditCategories: (id: string, text: string, choice: "edit" | "keep") => void
  changeDate: (number: number) => void
}

function TodoDetailView ({dailyTodos, currentTodos, selectedDate, selectCategoryId, categories, categoryText, setSelectCategoryId, setCategoryText,
  handleAddCategories, handleEditCategories, changeDate}: Props) {


  const categoryTodo = (categoryId: string) => {
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
      </div>
    </>
  )
}

export default TodoDetailView