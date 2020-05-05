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

export default () => (
  <PageLayout>
    <Introduction />
    <Row>
      <Detail title="Integrated Environment">
        Go beyond code, syntax-highlighting, close an unused block, smart
        completions for the best exclusive experience.
      </Detail>
      <Detail title="Crafted by Specialists">
        Over 400 problems designed and curated by specialists. To deliver the
        most comprehensive learning experience possible.
      </Detail>
      <Detail title="Trusted by thousands">
        Join other 10,000 to craft, learn and practice, on one of the best
        data-structure and algorithms solving platform.
      </Detail>
    </Row>

    {/* Featured Contest */}
    {/**
     * ! The logic here should be real-time, sync with Firebase.
     * ? Shouldn't be displayed when there's no contest.
     *  */}
    <Featured>Featured Contest</Featured>
    <FeaturedRow>
      <Card
        title="Google Code Jam"
        href="/"
        src="https://cdn-0.tierlistmania.com/wp-content/uploads/2019/07/Best-Ships-Tier-List-Azur-Lane.png"
        alt="アズールレーン"
      >
        Put your coding skills to the test as you work your way through multiple
        rounds of algorithmic coding puzzles for the title of Code Jam Champ and
        15000 USD.
      </Card>
      <Card
        title="Microsoft Imagine Cup"
        href="/"
        src="https://pbs.twimg.com/media/DundVDVUUAA89c8.jpg"
        alt="Houkai Impact 3rd"
      >
        Global competition that empowers the next generation of computer science
        students to team up and use their creativity, passion and knowledge of
        technology.
      </Card>
      <Card
        title="Google Code In"
        href="/"
        src="https://i0.wp.com/smartgamecap.net/wp-content/uploads/2020/02/photo.jpg?fit=1050%2C590&ssl=1"
        alt="アークナイツ"
      >
        Google's contest introducing 13-17 year old pre-university students to
        open source software development.
      </Card>
    </FeaturedRow>

    {/* Latest Problems */}
    <Featured>New Problems</Featured>
    <FeaturedRow>
      <Card title="Tortoise and Hare" href="/">
        Floyd's "tortoise and hare" cycle detection algorithm, applied to the
        sequence 2, 0, 6, 3, 1, 6, 3, 1
      </Card>
      <Card title="Permutation Sort" href="/">
        Randomly Shuffle an entire array until it completely sorted.
      </Card>
      <Card title="Red Black Tree" href="/">
        Every node is either red or black. Every leaf (NULL) is black. If a node
        is red, then both its children are black.
      </Card>
      <Card
        title="Instant Sort"
        href="https://www.npmjs.com/package/instant-sort"
      >
        The fastest sorting algorithm ever with the speed of O(1).
      </Card>
    </FeaturedRow>

    <Divider />

    {/* Showcase */}
    <Showcase
      title="Exclusive Data-Science Level Analytic"
      src="/assets/img/dashboard.png"
      alt="Dashboard Demo"
    >
      To enhance the best experience, tracking and analyzing is proven to be the
      best for planning future skills, and growth learning. Especially at
      programming.in.th, we crafted the finest dashboard for everyone.
    </Showcase>
    <Showcase
      title="Integrated Development Environment"
      src="/assets/img/ide.png"
      alt="Dashboard Demo"
      reverse
    >
      Beyond the thought, environment of programming.in.th is perfectly crafted
      for integrated development environment which result a perfect workspace
      for solving and experimenting an algorithm without a help of a code
      editor.
    </Showcase>
    <Showcase
      title="Exclusive Data-Science Level Analytic"
      src="/assets/img/dashboard.png"
      alt="IDK what to put here yet, so..."
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Showcase>

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
      Put some cool Thing here
    </div>
  </PageLayout>
)
