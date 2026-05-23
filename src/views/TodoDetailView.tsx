import type { View, DailyTodo, Category, Todo } from '../components/types' 
import { useState } from 'react'

type Props = {
  view: View
  dailyTodos: DailyTodo[]
  currentTodos: Todo[]
  setView: (view: View) => void
  selectCategoryId: string
  selectedDate: string
  categories: Category[]
  categoryText: string
  error: string | null
  loading: true | false
  setSelectCategoryId: (id: string) => void
  setCategoryText: (text: string) => void
  onAddCategories: () => void
  onDeleteCategory: (id: string) => void
  onChangeDate: (number: number) => void
}

function TodoDetailView ({view, dailyTodos, currentTodos, setView, selectedDate, selectCategoryId, categories, categoryText, error, loading, setSelectCategoryId, setCategoryText,
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
        <button onClick={() => onAddCategories}>追加</button>
      </div>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => {setSelectCategoryId(category.id), setView("list")}}>
                {category.name}
              </button>
            <button onClick={() => onDeleteCategory(category.id)}>消去</button>
            <p>達成率{categoryTodo(category.id)}%</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default TodoDetailView