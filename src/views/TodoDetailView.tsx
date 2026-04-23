import type { View, Todo, Category } from '../types' 
import { useState } from 'react'

type Props = {
  todos: Todo[]
  view: View
  setView: (view: View) => void
  selectCategoryId: number
  categories: Category[]
  setSelectCategoryId: (id: number) => void
}

function TodoDetailView ({todos, view, setView, selectCategoryId, categories, setSelectCategoryId }: Props) {
  
  const [categoryText, setCategoryText] = useState<string>("")
  return (
    <>
      <div>
        <input
          value={categoryText}
          onChange={(e) => setCategoryText(e.target.value)}
        />
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