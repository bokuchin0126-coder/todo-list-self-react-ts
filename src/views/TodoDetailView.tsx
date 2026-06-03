import type { DailyTodo, DailyCategory, Todo, Category } from '../components/types' 
import { useState } from 'react'
import { Link } from "react-router-dom"

type Props = {
  dailyTodos: DailyTodo[]
  currentTodos: Todo[]
  currentCategories: Category[]
  selectCategoryId: string
  selectedDate: string
  dailyCategories: DailyCategory[]
  categoryText: string
  setSelectCategoryId: (id: string) => void
  setCategoryText: (text: string) => void
  onAddCategories: () => void
  onDeleteCategory: (id: string) => void
  onChangeDate: (number: number) => void
}

function TodoDetailView ({dailyTodos, currentTodos, currentCategories, selectedDate, selectCategoryId, dailyCategories, categoryText, setSelectCategoryId, setCategoryText,
  onAddCategories, onDeleteCategory, onChangeDate}: Props) {


  const categoryTodo = (categoryId: string) => {
    const category = currentTodos.filter((todo) => todo.categoryId === categoryId) ?? []
    const completed = category.filter((category) => category.status === "completed")
    return category.length === 0 ? 0 : Math.floor((completed.length / category.length) * 100)
  }
  
  return (
    <>
      <div className="date-control">
        <button onClick={() => onChangeDate(-1)}>←</button>
        <p>{selectedDate}</p>
        <button onClick={() => onChangeDate(1)}>→</button>
      </div>
      <div>
        <input
          value={categoryText}
          placeholder="カテゴリーを追加..."
          onChange={(e) => setCategoryText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onAddCategories()
            }
          }}
        />
        <button onClick={onAddCategories}>追加</button>
      </div>
      <div>
        {currentCategories.map((category) => (
          <div key={category.id}>

            <Link to="/list">
              <button
                onClick={() => setSelectCategoryId(category.id)}>
                  {category.name}
              </button>
            </Link>

            <button onClick={() => onDeleteCategory(category.id)}>消去</button>
            <p>達成率{categoryTodo(category.id)}%</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default TodoDetailView