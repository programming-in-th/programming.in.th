import Dashboard from '../components/dashboard'

import {
  Header,
  Detail,
  Row,
  DiscussionCard,
  ProblemCard,
  Spacer,
  Table,
  Ranking,
  History,
  SkillAnalysis,
  LanguagePreference,
  AcceptanceRate,
  LevelActivity
} from '../components/dashboard/components'

import { Level } from '../components/dashboard/components/card/problem/types'
import { LanguagePreference as LanguagePreferenceModel } from '../components/dashboard/components/language-preference/types'

const discussion = [
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    by: {
      name: 'SaltyAom',
      image:
        'https://www.nicepng.com/png/detail/972-9721493_20614497-akari-has-arrived-gif.png'
    }
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    by: {
      name: 'SaltyAom',
      image:
        'https://www.nicepng.com/png/detail/972-9721493_20614497-akari-has-arrived-gif.png'
    }
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    by: {
      name: 'SaltyAom',
      image:
        'https://www.nicepng.com/png/detail/972-9721493_20614497-akari-has-arrived-gif.png'
    }
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    by: {
      name: 'SaltyAom',
      image:
        'https://www.nicepng.com/png/detail/972-9721493_20614497-akari-has-arrived-gif.png'
    }
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    by: {
      name: 'SaltyAom',
      image:
        'https://www.nicepng.com/png/detail/972-9721493_20614497-akari-has-arrived-gif.png'
    }
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    by: {
      name: 'SaltyAom',
      image:
        'https://www.nicepng.com/png/detail/972-9721493_20614497-akari-has-arrived-gif.png'
    }
  }
]

const problems = [
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    level: 'easy'
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    level: 'medium'
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    level: 'hard'
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    level: 'easy'
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    level: 'medium'
  },
  {
    href: 'Hi',
    title: 'Test',
    detail: 'Lorem Ipsum Dolar',
    level: 'hard'
  }
]

const history = new Array(365)
  .fill(null)
  .map(() => +(Math.random() * 14).toFixed(0))

const skillData = new Array(6)
  .fill(null)
  .map(() => +(Math.random() * 100).toFixed(0))

const languagePreference: LanguagePreferenceModel[] = [
  {
    label: 'C++',
    value: 55
  },
  {
    label: 'JavaScript',
    value: 30
  },
  {
    label: 'Rust',
    value: 10
  },
  {
    label: 'Python',
    value: 5
  }
]

const acceptanceRate = [
  {
    name: 'Acceptance Rate',
    data: new Array(14).fill(null).map((_, index) => ({
      x: new Date(
        new Date().setDate(new Date().getDate() - (30 - index))
      ).toLocaleDateString(),
      y: (Math.random() * 100).toFixed()
    }))
  }
]

const levelActivity = new Array(3)
  .fill(null)
  .map(() => +(Math.random() * 100).toFixed(0))

const DashboardDemo = () => (
  <Dashboard>
    <Header id="ranking">Ranking</Header>
    <Detail>Overall Ranking past 30 days.</Detail>
    <Ranking />

    <Spacer />

    <Table
      header={['Ranking', 'Name', 'Score']}
      data={[
        [39, 'SaltyAom', 1500],
        [40, 'Pattarachai12016', 1400],
        [41, 'YEET', 1300],
        [42, 'SaltyAom', 1200],
        [43, 'Pattarachai12016', 1100],
        [44, 'YEET', 1000],
        [45, 'SaltyAom', 900],
        [46, 'Pattarachai12016', 890],
        [47, 'YEET', 800]
      ]}
    />

    <Spacer />

    <Header id="discussion">Discussion</Header>
    <Detail>Recent discussion you've interacted with.</Detail>
    <Row wide>
      {discussion.map(({ detail, ...data }, index) => (
        <DiscussionCard key={index} {...data}>
          {detail}
        </DiscussionCard>
      ))}
    </Row>

    <Spacer />

    <Header id="problem">New Problem</Header>
    <Row>
      {problems.map(({ detail, level, ...data }, index) => (
        <ProblemCard key={index} {...data} level={level as Level}>
          {detail}
        </ProblemCard>
      ))}
    </Row>

    <Spacer />

    <Header id="suggested">Suggested Problem</Header>
    <Row wide>
      {problems.map(({ detail, level, ...data }, index) => (
        <ProblemCard key={index} {...data} level={level as Level}>
          {detail}
        </ProblemCard>
      ))}
    </Row>

    <Spacer />

    <Header id="unsolved">Recent Unsolved</Header>
    <Detail>Your recent unsolved problems.</Detail>
    <Row>
      {problems.map(({ detail, level, ...data }, index) => (
        <ProblemCard key={index} {...data} level={level as Level}>
          {detail}
        </ProblemCard>
      ))}
    </Row>

    <Spacer />

    <Header id="activity">Activity</Header>
    <Detail>
      You've made {history.reduce((prev, current) => prev + current, 0)}{' '}
      contributions since last year.
    </Detail>
    <History history={history} />

    <Spacer />

    <Header id="analysis">Analysis</Header>
    <Row wide>
      <SkillAnalysis data={skillData} />
      <LanguagePreference data={languagePreference} />
    </Row>

    <Spacer />

    <AcceptanceRate data={acceptanceRate} />

    <Spacer />

    <Detail>All solved problems</Detail>
    <LevelActivity data={levelActivity} />
  </Dashboard>
)

export default DashboardDemo
