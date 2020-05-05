import Dashboard, { Row, Card } from '../components/dashboard'
import {
  SkillAnalysis,
  CodeFrequent,
  History,
  LevelActivity,
  LanguagePreference
} from '../components/dashboard/collection'

const DashboardDemo = () => (
  <Dashboard>
    <Row>
      <Card size="fit" width={400} height={350}>
        <SkillAnalysis />
      </Card>
      <Card height={350}>
        <CodeFrequent />
      </Card>
    </Row>
    <Row>
      <Card height={250}>
        <History />
      </Card>
      <Card height={250}>
        <h1>Something here, don't know what it is yet.</h1>
      </Card>
    </Row>
    <Row>
      <Card height={350}>
        <LevelActivity />
      </Card>
      <Card height={350}>
        <LanguagePreference />
      </Card>
    </Row>
  </Dashboard>
)

export default DashboardDemo
