import type { View, Category, Todo } from '../types'
import {useState} from 'react'

type Props = {
    view: View
    categories: Category[]
    selectCategoryId: string
    setView: (view: View) => void
    setCategories: (categories: Category[]) => void
    setSelectCategoryId: (id: string) => void
    categoriesTodos: Todo[]
    onAddCategories: (text: string) => void
}

function TodoDetailView ({view, categories, selectCategoryId, setView, setCategories, setSelectCategoryId, categoriesTodos, 
  onAddCategories}: Props) {

    const [inputText, setInputText] = useState<string>("")

    const achievement = categoriesTodos.filter((category) => category.status === "completed")

    const achievementRate = () => {
      return (achievement.length / categoriesTodos.length) * 100
    }

    return (
      <>
        <div>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="カテゴリーを追加..."
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
              <div key={category.id}>
                <p>{category.name}</p>
                <button
                  onClick={() => {
                    setSelectCategoryId(category.id)
                    setView("list")
                    setInputText("")}}>
                      ▽
                </button>
                <p >達成率{achievementRate()}</p>
              </div>
            ))}
          </div>
            
        
      </>
    )
}

export default TodoDetailView