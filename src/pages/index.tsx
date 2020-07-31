import React, { useRef, useEffect, useReducer } from 'react'
import { GetStaticProps } from 'next'

import { PageLayout } from 'components/Layout'

import Countup from 'react-countup'

import db from 'lib/firebase-admin'

import { Introduction, Join, Showcase } from '../components/landing'
import { Row, Detail } from '../components/landing/detail'
import {
  Row as FeaturedRow,
  Card,
  Featured,
} from '../components/landing/featured'

import intl from '../intl/index.json'

const Index = ({ translated, userCount }) => {
  // Transform this to state management engine.

  const contestData = [
    {
      href: '/',
      src:
        'https://github.com/programming-in-th/programming.in.th/raw/dev/public/assets/img/og.jpg',
      alt: 'og',
    },
    {
      href: '/',
      src:
        'https://github.com/programming-in-th/programming.in.th/raw/dev/public/assets/img/og.jpg',
      alt: 'og',
    },
    {
      href: '/',
      src:
        'https://github.com/programming-in-th/programming.in.th/raw/dev/public/assets/img/og.jpg',
      alt: 'og',
    },
  ]

  // If 'isReverse' is set to true, justifyContent is aliged as flex-end.
  const showcaseAssets = [
    {
      src: '/assets/img/ide.png',
      alt: 'IDE Showcase',
      isReverse: true,
    },
    {
      src: '/assets/img/dashboard.png',
      alt: 'IDK what to put here yet, so...',
      isReverse: false,
    },
  ]

  const { interactiveShowcase } = translated

  const [isShowingInterative, showInteractive] = useReducer(() => true, false)
  const interactive = useRef<HTMLElement>()

  useEffect(() => {
    let detectInteractive = () => {
      if (
        typeof interactive.current === 'undefined' ||
        interactive.current === null
      )
        return

      let interactivePosition = interactive.current.getBoundingClientRect().top

      if (interactivePosition === 0) return

      if (interactivePosition > window.innerHeight / 2) return

      showInteractive()

      window.removeEventListener('scroll', detectInteractive)
    }

    window.addEventListener('scroll', detectInteractive, {
      passive: true,
    })

    detectInteractive()
  }, [])

  return (
    <PageLayout>
      <Introduction translated={translated} />

      {/* Featured */}
      <Row>
        {translated.feature.map(({ title, detail }) => (
          <Detail title={title} key={title}>
            {detail}
          </Detail>
        ))}
      </Row>

      {/* Featured Contest */}
      {/**
       * ? Shouldn't be displayed when there's no contest.
       *  */}
      {/* <Featured>{translated.contest.title}</Featured>
      <FeaturedRow>
        {translated.contest.list.map(({ title, detail }, index) => (
          <Card
            title={title}
            href={contestData[index].href}
            src={contestData[index].src}
            alt={contestData[index].alt}
            key={title}
          >
            {detail}
          </Card>
        ))}
      </FeaturedRow> */}

      {/* Latest Problems */}
      {/* <Featured>{translated.problems.title}</Featured> */}
      {/* <FeaturedRow>
        {translated.problems.list.map(({ title, detail }, index) => (
          <Card title={title} href={problemData[index].href} key={title}>
            {detail}
          </Card>
        ))}

        <Card title="More Problem" href="/tasks">
          Explore various competitive problems.
        </Card>
      </FeaturedRow> */}

      {/* <Divider /> */}

      {/* InteractiveShowcase */}
      <section ref={interactive} className="landing-showcase">
        <article className="article">
          <h3 className="title">{interactiveShowcase.title}</h3>
          <p className="detail">{interactiveShowcase.detail}</p>
        </article>
        <section
          className={`cover -interactive ${
            isShowingInterative ? 'interacted' : ''
          }`}
        >
          <p className="detail">กว่า</p>
          {isShowingInterative ? (
            <Countup
              start={0}
              end={userCount}
              duration={3}
              delay={0}
              useEasing={true}
              separator=","
            >
              {({ countUpRef }) => <h1 className="title" ref={countUpRef} />}
            </Countup>
          ) : null}
          <p className="detail">คนได้เข้าร่วมกับเรา</p>
        </section>
      </section>

      {/* Showcase */}
      {/* {translated.showcase.map(({ title, detail }, index) => (
        <Showcase
          title={title}
          src={showcaseAssets[index].src}
          alt={showcaseAssets[index].src}
          key={title}
          reverse={showcaseAssets[index].isReverse}
        >
          {detail}
        </Showcase>
      ))} */}

      {/* Last Chance for asking to join the platform */}
      <Join translated={translated} />
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const taskDocs = await db()
    .collection('tasks')
    .where('visible', '==', true)
    .get()

  const userDocs = await db().collection('users').get()

  const taskCount = taskDocs.size
  const userCount = userDocs.size

  const returnChangeValue = (value: string) => {
    return value
      .replace('$taskCount$', `${taskCount}`)
      .replace('$userCount$', `${userCount}`)
  }

  const recursive = (props: any) => {
    if (Array.isArray(props)) {
      const temp = []
      for (const x of props) {
        temp.push(recursive(x))
      }
      return temp
    } else if (typeof props === 'string') {
      return returnChangeValue(props)
    } else {
      const temp = {}
      for (const key in props) {
        temp[key] = recursive(props[key])
      }
      return temp
    }
  }

  const lang = 'th'
  const translated = recursive(intl[lang])

  return {
    props: {
      translated,
      userCount,
    },
    unstable_revalidate: 60 * 60 * 24,
  }
}

export default Index
