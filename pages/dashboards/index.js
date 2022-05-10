import MainContainer from "../components/mainContainer";
import PieChartExample from "./PieChartExample";
import PlayerRadar from "./PlayerRadar";
// import VerticalBarChartExample from "./VerticalBarChartExample";
import PointProgressionLineChart from "./PointProgressionLineChart";

export default function Dashboards(props) {
  return (
    <MainContainer>
      <div>
        <h1>Dashboards Page</h1>
        {/* <PieChartExample /> */}
        <PointProgressionLineChart matchId='fsvf5vaKxwbVPeBMKjyQ'/>
        <PointProgressionLineChart matchId='0PTH6Ek5ZYJjUCLopHNK'/>
        <PlayerRadar />
      </div>
    </MainContainer>
  );
}
