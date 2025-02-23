import { AnalysisSelect } from "../components/AnalysisSelect";
import Header from "../components/Header/Index";

export default function Analysis() {
  return (
    <div style={{ background: "#9F9F9F" }}>
      <Header />
      <div style={{ marginTop: "20px", padding: "20px" }}>
        <AnalysisSelect />
      </div>
    </div>
  );
}
