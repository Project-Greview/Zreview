// MODULE
import { useRecoilState } from "recoil";
// RECOIL STATE
import { starScoreState } from "../../state/writeState";
// SVG
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
// PROPS TYPE
type StarScoreProps = {
  max: number;
};

const StarScore: React.FC<StarScoreProps> = ({ max }) => {
  const [score, setScore] = useRecoilState(starScoreState);
  const hadnleCheckedScore = (index: number) => {
    setScore(index);
  };
  console.log(score);
  const rendering = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isChecked = i <= score;
      const color = isChecked ? "#6656ff" : "rgba(0,0,0,0)";
      stars.push(
        <div key={i}>
          <input
            type="checkbox"
            id={`star_score_${i}`}
            name="type"
            checked={isChecked}
            className="none"
            onChange={() => hadnleCheckedScore(i)}
          />
          <label htmlFor={`star_score_${i}`}>
            <ScoreIcon key={i} color={color} />
          </label>
        </div>
      );
    }
    return stars;
  };

  return <>{rendering()}</>;
};

export default StarScore;
