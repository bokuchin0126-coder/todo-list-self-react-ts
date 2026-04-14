import type { Todo } from './types'

type Props = {
    todo: Todo
    onToggle: (id: number) => void
}

function TodoItem({ todo, onToggle }: Props) {
    return (
      <div key={todo.id}>
        <button onClick={() => onToggle(todo.id)}>{todo.status === "active" ? "□" : "☑"}</button>
        {todo.text}
      </div>
    )
}

export default TodoItem