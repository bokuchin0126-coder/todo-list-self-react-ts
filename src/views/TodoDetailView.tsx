import type { Category, Todo } from '../components/types'
import {useState} from 'react'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"

type Props = {
    categories: Category[]
    currentTodos: Todo[]
    selectedDate: string
    setSelectCategoryId: (id: string) => void
    handleAddCategories: (text: string) => void
    handleEditCategories: (id: string, text: string, choose: "edit" | "keep") => void
    changeDate: (number: number) => void
}

function TodoDetailView ({categories, selectedDate, setSelectCategoryId, handleAddCategories, handleEditCategories,
  currentTodos, changeDate}: Props) {

    const todoContext = useContext(AppContext)
    if (!todoContext) throw new Error("Context not found")
    const { error, loading } = todoContext

    const [inputText, setInputText] = useState<string>("")
    const [editText, setEditText] = useState<string>("")

    const categoryTodo = (categoryId: string) => {
      const category = currentTodos.filter((todo) => todo.categoryId === categoryId)
      const completed = category.filter((category) => category.status === "completed")
      return category.length === 0 ? 0 : Math.floor((completed.length / category.length) * 100)
    }
    
    return (
      <>
        <div className="category-list">
          <div className="date-control">
            <button onClick={() => changeDate(-1)}>←</button>
            <p>{selectedDate}</p>
            <button onClick={() => changeDate(1)}>→</button>
          </div>
            <input
              className="input-area"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="カテゴリーを追加..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleAddCategories(inputText)
                    setInputText("")
                }
              }} 
            />
            <button onClick={() => handleAddCategories(inputText)}>追加</button>
          </div>
        {error && <p>{error}</p>}
        {loading && <p>ローディング中...</p>}

          <div className="detail-header">
            {categories.map(category => (
              <div className="category-item" key={category.id}>

                <div className="category-left">
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
                      <p className="category-name">{category.name}</p>
                      <button onClick={() => {setEditText(category.name), handleEditCategories(category.id, "", "edit")}}>
                        編集
                      </button>
                    </div>
                  }

                  <p className="category-progress">達成率{categoryTodo(category.id)}%</p>
                </div>

                <div className="category-buttons">
                  <Link to="/list">
                  <button
                      className="opan-button"
                      onClick={() => {
                        setSelectCategoryId(category.id)
                        setInputText("")}}>
                          ▽
                    </button>
                  </Link>
                </div>
                
              </div>
            ))}

            <Link to="/stats">達成率一覧</Link>
          </div>
            
        
      </>
    )
}

export default TodoDetailView