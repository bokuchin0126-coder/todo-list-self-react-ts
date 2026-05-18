import type { View, Category, Todo, DailyTodo } from '../components/types'
import {useState} from 'react'

type Props = {
    view: View
    dailyTodos: DailyTodo[]
    categories: Category[]
    currentTodos: Todo[]
    error: string | null
    loading: boolean
    selectedDate: string
    selectCategoryId: string
    setView: (view: View) => void
    setCategories: (categories: Category[]) => void
    setSelectCategoryId: (id: string) => void
    categoriesTodos: Todo[]
    onAddCategories: (text: string) => void
    onDeleteCategories: (id: string) => void
    onChangeDate: (number: number) => void
}

function TodoDetailView ({view, dailyTodos, categories, selectCategoryId, selectedDate, setView, setCategories, setSelectCategoryId, categoriesTodos, 
  error, loading, onAddCategories, onDeleteCategories, currentTodos, onChangeDate}: Props) {

    const [inputText, setInputText] = useState<string>("")

    const categoryTodo = (categoryId: string) => {
      const category = currentTodos.filter((todo) => todo.categoryId === categoryId)
      const completed = category.filter((category) => category.status === "completed")
      return category.length === 0 ? 0 : Math.floor((completed.length / category.length) * 100)
    }
    
    return (
      <>
        <div className="category-list">
          <div>
            <button onClick={() => onChangeDate(-1)}>←</button>
            <p>{selectedDate}</p>
            <button onClick={() => onChangeDate(1)}>→</button>
          </div>
            <input
              className="input-area"
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
              <div className="category-item" key={category.id}>
                <p>{category.name}</p>
                <button
                  onClick={() => {
                    setSelectCategoryId(category.id)
                    setView("list")
                    setInputText("")}}>
                      ▽
                </button>
                <button onClick={() => onDeleteCategories(category.id)}>消去</button>
                <p>達成率{categoryTodo(category.id)}%</p>
              </div>
            ))}
          </div>
            
        
      </>
    )
}

export default TodoDetailView