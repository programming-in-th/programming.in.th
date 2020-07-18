import React, { useRef, useEffect, useReducer } from 'react'

import { PageLayout } from 'components/Layout'

import { Divider } from '@chakra-ui/core'

import Countup from 'react-countup'

import { Introduction, Join, Showcase } from '../components/landing'
import { Row, Detail } from '../components/landing/detail'
import {
  Row as FeaturedRow,
  Card,
  Featured
} from '../components/landing/featured'

import intl from '../intl/index.json'

const Index = () => {
  // Transform this to state management engine.
  const lang = 'en'
  const translated = intl[lang]

  const contestData = [
    {
      href: '/',
      src:
        'https://cdn-0.tierlistmania.com/wp-content/uploads/2019/07/Best-Ships-Tier-List-Azur-Lane.png',
      alt: 'アズールレーン'
    },
    {
      href: '/',
      src: 'https://pbs.twimg.com/media/DundVDVUUAA89c8.jpg',
      alt: 'Houkai Impact 3rd'
    },
    {
      href: '/',
      src:
        'http://i0.wp.com/smartgamecap.net/wp-content/uploads/2020/02/photo.jpg?fit=1050%2C590%2C590&ssl=1',
      alt: 'アークナイツ'
    }
  ]

  const problemData = [
    {
      href: '/'
    },
    {
      href: '/'
    },
    {
      href: '/'
    },
    {
      href: 'https://www.npmjs.com/package/instant-sort'
    }
  ]

  // If 'isReverse' is set to true, justifyContent is aliged as flex-end.
  const showcaseAssets = [
    {
      src: '/assets/img/ide.png',
      alt: 'IDE Showcase',
      isReverse: true
    },
    {
      src: '/assets/img/dashboard.png',
      alt: 'IDK what to put here yet, so...',
      isReverse: false
    }
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
      passive: true
    })

    detectInteractive()
  }, [])

  return (
    <PageLayout>
      <Introduction />

      {/* Featured */}
      <Row>
        {translated.feature.map(({ title, detail }) => (
          <Detail title={title}>{detail}</Detail>
        ))}
      </Row>

      {/* Featured Contest */}
      {/**
       * ? Shouldn't be displayed when there's no contest.
       *  */}
      <Featured>{translated.contest.title}</Featured>
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
      </FeaturedRow>

      {/* Latest Problems */}
      <Featured>{translated.problems.title}</Featured>
      <FeaturedRow>
        {translated.problems.list.map(({ title, detail }, index) => (
          <Card title={title} href={problemData[index].href} key={title}>
            {detail}
          </Card>
        ))}

        <Card title="More Problem" href="/tasks">
          Explore various competitive problems.
        </Card>
      </FeaturedRow>

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
          <p className="detail">Over</p>
          {isShowingInterative ? (
            <Countup
              start={0}
              end={10000}
              duration={3}
              delay={0}
              useEasing={true}
              separator=","
            >
              {({ countUpRef }) => <h1 className="title" ref={countUpRef} />}
            </Countup>
          ) : null}
          <p className="detail">Programmers enrolled</p>
        </section>
      </section>

      {/* Showcase */}
      {translated.showcase.map(({ title, detail }, index) => (
        <Showcase
          title={title}
          src={showcaseAssets[index].src}
          alt={showcaseAssets[index].src}
          key={title}
          reverse={showcaseAssets[index].isReverse}
        >
          {detail}
        </Showcase>
      ))}

      {/* Last Chance for asking to join the platform */}
      <Join />
    </PageLayout>
  )
}

export default Index
