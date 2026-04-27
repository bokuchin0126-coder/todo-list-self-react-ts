import type { View, Category } from '../types'
import {useState} from 'react'

type Props = {
    view: View
    categories: Category[]
    selectCategoryId: string
    setView: (view: View) => void
    setCategories: (categories: Category[]) => void
    setSelectCategoryId: (id: string) => void
    onAddCategories: (text: string) => void
}

function TodoDetailView ({view, categories, selectCategoryId, setView, setCategories, setSelectCategoryId, onAddCategories}: Props) {

    const [inputText, setInputText] = useState<string>("")

    return (
      <>
        <div>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onAddCategories(inputText)
                    setInputText("")
                }
              }} 
            />
            <button onClick={() => onAddCategories(inputText)}>追加</button>
          </div>

          <div>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectCategoryId(category.id)
                  setView("list")
                  setInputText("")}}>
                    {category.name}
              </button>
            ))}
          </div>
            
        
      </>
    )
}

export default TodoDetailView