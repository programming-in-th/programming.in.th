import React from 'react'

import { PageLayout } from '../components/Layout'

import { Divider } from '@chakra-ui/core'

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
      src: '/assets/img/dashboard.png',
      alt: 'Dashboard Demo',
      isReverse: false
    },
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

  return (
    <PageLayout>
      <Introduction />
      <Row>
        {translated.feature.map(({ title, detail }) => (
          <Detail title={title}>{detail}</Detail>
        ))}
      </Row>

      {/* Featured Contest */}
      {/**
       * ! The logic here should be real-time, sync with Firebase.
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
      </FeaturedRow>

      <Divider />

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
      {/* Some cool thing placeholder */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px'
        }}
      >
        Put some cool artwork here
      </div>
    </PageLayout>
  )
}

export default Index
