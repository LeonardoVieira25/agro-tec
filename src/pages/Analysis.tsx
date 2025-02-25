import { AnalysisSelect } from '../components/AnalysisSelect';
import Layout from '../components/Layout/Index';

export default function Analysis() {
  return (
    <Layout>
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <AnalysisSelect />
      </div>
    </Layout>
  );
}
