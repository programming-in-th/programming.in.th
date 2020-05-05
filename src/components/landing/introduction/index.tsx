import Link from 'next/link'

import './landing-introduction.styl'

const Introduction = () => (
  <section id="landing-introduction">
    <article className="article">
      <h1 className="brand">Programming.in.th</h1>
      <h2 className="title">
        It's time to
        <span className="keyword">Level Up</span>
      </h2>
      <ul
        className="unorder"
        style={{ listStyleImage: 'url(/icon/check.svg)' }}
      >
        <li className="list">Data Structure & Algorithms</li>
        <li className="list">Over 400 Challenges</li>
        <li className="list">Join over 10,000 programmers.</li>
      </ul>
      <footer className="action">
        <Link href="/dashboard">
          <a className="enroll">
            Start today
            <img className="icon" src="/icon/chevron_right.svg" alt="Chevron" />
          </a>
        </Link>
        <Link href="/tasks">
          <a className="explore">Explore Challenge</a>
        </Link>
      </footer>
      {/* <a className="provider">Get start now, it's free.</a> */}
    </article>
    <figure className="cover">
      <picture className="container">
        <img
          className="image"
          src="https://vignette.wikia.nocookie.net/himoto-umaruchan/images/a/a2/Umaru%27s_anime_design_%28chibi%29.png/revision/latest?cb=20200411195915"
        />
      </picture>
    </figure>
  </section>
)

export default Introduction
