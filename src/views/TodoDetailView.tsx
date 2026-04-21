import type { View } from '../types' 

type Props = {
  view: View
  setView: (view: View) => void
}

function TodoDetailView ({view, setView}: Props) {
  return (
    <button onClick={() => setView("list")}>戻る</button>
  )
}

export default TodoDetailView