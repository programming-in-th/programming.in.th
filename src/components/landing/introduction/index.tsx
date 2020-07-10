import Link from 'next/link'

import './landing-introduction.styl'

import intl from '../../../intl/index.json'

const Introduction = () => {
  // Transform this to state management engine.
  const lang = 'en'

  const translated = intl[lang]

  const { header, list, action, subAction } = translated.introduction

  return (
    <section id="landing-introduction">
      <article className="article">
        <h1 className="brand">Programming.in.th</h1>
        <h2 className="title">
          {header[0]}
          <span className="keyword">{header[1]}</span>
        </h2>
        <ul
          className="unorder"
          style={{ listStyleImage: 'url(/icon/check.svg)' }}
        >
          <li className="list">{list[0]}</li>
          <li className="list">{list[1]}</li>
          <li className="list">{list[2]}</li>
        </ul>
        <footer className="action">
          {/* <Link href="/dashboard"> */}
          <Link href="/signup">
            <a className="enroll">
              {action}
              <img
                className="icon"
                src="/icon/chevron_right.svg"
                alt="Chevron"
              />
            </a>
          </Link>
          <Link href="/tasks">
            <a className="explore">{subAction}</a>
          </Link>
        </footer>
        {/* <a className="provider">Get start now, it's free.</a> */}
      </article>
      <figure className="cover">
        <picture className="container">
          <img className="image" src="/assets/img/landing@1.5x.jpg" />
        </picture>
      </figure>
    </section>
  )
}

export default Introduction
