import './history.styl'

/**
 * ! Psuedo Code
 * ? Don't do this, replace with something else.
 */
const getHistory = () => [
  { 'submission name': 'Hello World', date: '18/04/2020', level: 'Easy' },
  { 'submission name': 'YEET', date: '15/04/2020', level: 'Hard' },
  { 'submission name': 'Lazy Target', date: '14/03/2020', level: 'Medium' },
  {
    'submission name': 'I want to play MaiMai during Quarantine',
    date: '05/03/2020',
    level: 'Impossible'
  }
]

const History = () => {
  let history = getHistory(),
    heading = Object.getOwnPropertyNames(history[0])

  return (
    <table className="dashboard-history">
      <thead className="head">
        <tr className="row">
          {heading.map(title => (
            <td className="data">{title}</td>
          ))}
        </tr>
      </thead>
      <tbody className="body">
        {history.map((entry, index) => (
          <tr className="row" key={index}>
            {heading.map(title => (
              <td className="data" key={title}>
                {entry[title]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default History
