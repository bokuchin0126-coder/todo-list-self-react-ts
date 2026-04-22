import type { View, Todo, Category } from '../types' 

type Props = {
  todos: Todo[]
  view: View
  setView: (view: View) => void
  selectCategoryId: number
  categories: Category[]
  setSelectCategoryId: (id: number) => void
}

function TodoDetailView ({todos, view, setView, selectCategoryId, categories, setSelectCategoryId }: Props) {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {setSelectCategoryId(category.id), setView("list")}}>
            {category.name}
          </button>
      ))}
    </div>
  )
}

export default TodoDetailView