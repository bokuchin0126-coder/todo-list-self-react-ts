import { Link } from "react-router-dom"

type Props = {
    todayAchievement: () => number
    periodAchievement: (number: number) => number
    continuousAchievement: () => number
}

function TodoStatsView({ todayAchievement, periodAchievement, continuousAchievement }: Props) {

    return (
        <>
          <div>
            <p>今日の達成率：{todayAchievement()}%</p>
            <p>過去7日間の達成率：{periodAchievement(7)}%</p>
            <p>過去30日間の達成率：{periodAchievement(30)}%</p>
            <p>連続達成日数：{continuousAchievement()}日</p>
            
            <Link to="/">戻る</Link>
          </div>
        </>
    )
}

export default TodoStatsView