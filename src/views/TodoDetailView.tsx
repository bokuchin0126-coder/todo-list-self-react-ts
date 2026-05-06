import type { View, Category, Todo } from '../types'
import {useState} from 'react'

type Props = {
    view: View
    todos: Todo[]
    categories: Category[]
    error: string | null
    loading: boolean
    selectCategoryId: string
    setView: (view: View) => void
    setCategories: (categories: Category[]) => void
    setSelectCategoryId: (id: string) => void
    categoriesTodos: Todo[]
    onAddCategories: (text: string) => void
}

function TodoDetailView ({view, todos, categories, selectCategoryId, setView, setCategories, setSelectCategoryId, categoriesTodos, 
  error, loading, onAddCategories}: Props) {

    const [inputText, setInputText] = useState<string>("")

    const categoryTodo = (categoryId: string) => {
      const category = todos.filter((todo) => todo.categoryId === categoryId)
      const completed = category.filter((category) => category.status === "completed")
      return category.length === 0 ? 0 : Math.floor((completed.length / category.length) * 100)
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
        {error && <p>{error}</p>}
        {loading && <p>ローディング中...</p>}

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
                <p>達成率{categoryTodo(category.id)}</p>
              </div>
            ))}
          </div>
            
        
      </>
    )
}

export default TodoDetailView