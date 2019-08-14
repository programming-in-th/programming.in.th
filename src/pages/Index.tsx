/* React */
import React from 'react'

/* React Component */
import { CustomCard } from '../components/Card'
import { ForumListWrapper } from '../components/ForumListWrapper'

/* Static */
import styles from '../assets/css/card.module.css'

export const Index: React.FunctionComponent = () => (
  <React.Fragment>
    <div id="root">
      <div className={styles.wrapper}>
        <CustomCard
          title="Tasks"
          icon="functions"
          to="/tasks"
          color="rgb(61, 90, 254)"
          shadow="rgba(61, 90, 254, .625)"
          linkCard
        />
        <CustomCard
          title="Learn"
          icon="school"
          to="/learn"
          color="rgb(29, 233, 182)"
          shadow="rgba(29, 233, 182, .625)"
          linkCard
        />
        <CustomCard
          title="Users"
          icon="account_box"
          to="/users"
          color="rgb(255, 23, 68)"
          shadow="rgba(255, 23, 68, .625)"
          linkCard
        />
      </div>
      <div className={styles.wrapper}>
        <CustomCard
          title="Forum"
          icon="forum"
          to="/forum"
          color="rgb(0, 229, 255)"
          shadow="rgba(0, 229, 255, .625)"
          linkCard
        />
        <CustomCard
          title="Exams"
          icon="featured_play_list"
          to="/exam"
          color="rgb(213, 0, 249)"
          shadow="rgba(213, 0, 249, .625)"
          linkCard
        />
      </div>
      <ForumListWrapper />
    </div>
  </React.Fragment>
)
