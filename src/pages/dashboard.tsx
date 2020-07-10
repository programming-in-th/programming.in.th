import Dashboard, { Row, Card, Header } from '../components/dashboard'
import {
  SkillAnalysis,
  CodeFrequent,
  History,
  LevelActivity,
  LanguagePreference,
  Title
} from '../components/dashboard/collection'

import {
  ActivityCard,
  ActivityContainer
} from '../components/dashboard/activity'

// Still rework

const DashboardDemo = () => null

// const DashboardDemo = () => (
//   <Dashboard>
//     <Header>Progression</Header>
//     <Title>Recent Activity</Title>
//     <Row>
//       <ActivityContainer>
//         <ActivityCard title="Problem 1" href="/">
//           Hashmap
//         </ActivityCard>
//         <ActivityCard title="Problem 2" href="/">
//           Linked list
//         </ActivityCard>
//         <ActivityCard title="Problem 3" href="/">
//           Merge Sort
//         </ActivityCard>
//         <ActivityCard title="Problem 4" href="/">
//           Yeet
//         </ActivityCard>
//         <ActivityCard title="Problem 5" href="/">
//           No U
//         </ActivityCard>
//         <ActivityCard title="Problem 6" href="/">
//           No U
//         </ActivityCard>

//         <ActivityCard title="Explore more">History</ActivityCard>
//       </ActivityContainer>
//     </Row>

//     <Header>Analysis</Header>
//     <Row>
//       <Card size="fit" width={400} height={350}>
//         <SkillAnalysis />
//       </Card>
//       <Card height={350}>
//         <CodeFrequent />
//       </Card>
//     </Row>
//     <Row>
//       <Card height={250}>
//         <History />
//       </Card>
//       <Card height={250}>
//         <h1>Something here, don't know what it is yet.</h1>
//       </Card>
//     </Row>
//     <Row>
//       <Card height={350}>
//         <LevelActivity />
//       </Card>
//       <Card height={350}>
//         <LanguagePreference />
//       </Card>
//     </Row>
//   </Dashboard>
// )

export default DashboardDemo
