import './history.styl'

const History = ({ history }: { history: number[] }) => {
  let max = Math.max(...history)

  return (
    <section className="history">
      {history.map((data, index) => (
        <div className="activity" key={index}>
          <div className="heat" style={{ opacity: data / max }} />
          <div className="tooltip">
            <p className="date">
              {new Date(
                new Date().setDate(
                  new Date().getDate() - (history.length - index)
                )
              ).toLocaleDateString()}
            </p>
            <p className="detail">{data} contribution</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default History
