import { AnalysisSelect } from '../components/AnalysisSelect';
import Header from '../components/Header/Index';

export default function Analysis() {
  return (
    <div style={{ background: '#fff' }}>
      <Header />
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <AnalysisSelect />
      </div>
    </div>
  );
}
