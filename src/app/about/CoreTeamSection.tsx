import { CoreTeamCard } from '@/app/about/CoreTeamCard'

import { OrgMember } from './types'

export const CoreTeamSection = ({ coreTeam }: { coreTeam: OrgMember[] }) => {
  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-x-5">
      {coreTeam.map((member, index) => (
        <CoreTeamCard
          key={index}
          avatar_url={member.avatar_url}
          html_url={member.html_url}
          login={member.login}
        />
      ))}
    </div>
  )
}
