import './table.styl'

const Table = ({ header, data }) => (
  <section className="data-table">
    <table className="table">
      <thead className="head">
        <tr className="row">
          {header.map(title => (
            <th className="title" key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="body">
        {data.map((row, index) => (
          <tr className="row" key={index}>
            {row.map(data => (
              <td className="data" key={index + data}>
                {data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)

export default Table
