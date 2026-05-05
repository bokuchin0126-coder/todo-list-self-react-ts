import type { View, Todo, Category } from '../types' 
import { useState } from 'react'

type Props = {
  view: View
  todos: Todo[]
  setView: (view: View) => void
  selectCategoryId: string
  categories: Category[]
  categoryText: string
  error: string | null
  loading: true | false
  setSelectCategoryId: (id: string) => void
  setCategoryText: (text: string) => void
  onAddCategories: () => void
  onDeleteCategory: (id: string) => void
}

function TodoDetailView ({view, todos, setView, selectCategoryId, categories, categoryText, error, loading, setSelectCategoryId, setCategoryText,
  onAddCategories, onDeleteCategory}: Props) {


  const categoryTodo = (categoryId: string) => {
    const category = todos.filter((todo) => todo.categoryId === categoryId)
    const completed = category.filter((category) => category.status === "completed")
    return category.length === 0 ? 0 : Math.floor((completed.length / category.length) * 100)
  }
  
  return (
    <>
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