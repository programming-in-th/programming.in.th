import { useEffect, useState, useCallback } from 'react'

import Link from 'next/link'

import Tab from './tab'
import Profile from './profile'

import {
  Communication,
  Frequency,
  New,
  Ranking,
  Recent,
  Skills,
  Suggested
} from '../icon'

import './sidebar.styl'

const Sidebar = ({ show }) => {
  let [position, updatePosition] = useState(0),
    getSidebarData = useCallback(
      () => [
        {
          icon: <Ranking />,
          href: '#ranking',
          children: 'Ranking'
        },
        {
          icon: <Communication />,
          href: '#discussion',
          children: 'Recent Discussion'
        },
        {
          icon: <New />,
          href: '#problem',
          children: 'New Problem'
        },
        {
          icon: <Suggested />,
          href: '#suggested',
          children: 'Suggested'
        },
        {
          icon: <Recent />,
          href: '#unsolved',
          children: 'Recent Unsolved'
        },
        {
          icon: <Frequency />,
          href: '#activity',
          children: 'Activity'
        },
        {
          icon: <Skills />,
          href: '#analysis',
          children: 'Analysis'
        }
      ],
      []
    )

  useEffect(() => {
    requestAnimationFrame(() => {
      let headers = Array.from(
          document.querySelectorAll('#dashboard > .header')
        ),
        windowHeight = window.innerHeight / 3

      let detectPosition = () => {
        let detected = headers.some((header, index) => {
          if (!index && headers[1].getBoundingClientRect().top >= windowHeight)
            return updatePosition(index)

          if (header.getBoundingClientRect().top >= windowHeight) {
            if (index - 1 !== position) updatePosition(index - 1)
            return true
          }
        })

        if (!detected && getSidebarData().length - 1 !== position)
          updatePosition(getSidebarData().length - 1)
      }

      detectPosition()

      window.addEventListener('scroll', detectPosition, {
        passive: true
      })

      return () => window.removeEventListener('scroll', detectPosition)
    })
  }, [])

  return (
    <aside id="dashboard-sidebar" className={show ? '-show' : ''}>
      <section className="header">
        <Link href="/">
          <a className="link">
            <h1 className="title">Programming.in.th</h1>
          </a>
        </Link>
      </section>
      <section className="navigation">
        {getSidebarData().map(({ children, ...data }, index) => (
          <Tab {...data} key={index} active={index === position}>
            {children}
          </Tab>
        ))}
      </section>
      <Profile
        href="/dashboard"
        image="https://avatars1.githubusercontent.com/u/35027979?s=400&u=14ef5e79429dd79370dcf72b6fb457a9c1d93551&v=4"
      >
        SaltyAom
      </Profile>
    </aside>
  )
}

export default Sidebar
