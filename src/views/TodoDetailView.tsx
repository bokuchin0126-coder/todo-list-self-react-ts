import type { View, Todo, Category } from '../types' 
import { useState } from 'react'

type Props = {
  view: View
  setView: (view: View) => void
  selectCategoryId: number
  categories: Category[]
  categoryText: string
  setSelectCategoryId: (id: number) => void
  setCategoryText: (text: string) => void
  onAddCategories: () => void
}

function TodoDetailView ({view, setView, selectCategoryId, categories, categoryText, setSelectCategoryId, setCategoryText,
  onAddCategories}: Props) {
  
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
          <button
            key={category.id}
            onClick={() => {setSelectCategoryId(category.id), setView("list")}}>
              {category.name}
            </button>
        ))}
      </div>
    </>
  )
}

export default TodoDetailView