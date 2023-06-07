import { CoreTeamCard } from '@/components/About/CoreTeamCard'
import { GithubMemberProps } from '@/types/GithubMemberProps'

export const CoreTeam = ({ coreTeam }: { coreTeam: GithubMemberProps[] }) => {
  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-x-5">
      {coreTeam &&
        coreTeam.map((member, index) => (
          <CoreTeamCard
            avatar_url={member.avatar_url}
            html_url={member.html_url}
            login={member.login}
            key={index}
          />
        ))}
    </div>
  )
}
