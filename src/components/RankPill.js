import "./RankPill.scss";

const RankPill = ({ rank }) => {
  return (
    <div className={`RankPill ${rank}`}>
      <i class="fa-solid fa-certificate"></i> {rank}
    </div>
  );
};

export default RankPill;
