export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (
  props
) => <table className="w-full border-collapse whitespace-no-wrap" {...props} />

export const Th: React.FC<React.ThHTMLAttributes<
  HTMLTableHeaderCellElement
>> = (props) => (
  <th className="text-left border border-gray-300 p-1" {...props} />
)

export const Tr: React.FC<
  React.HTMLAttributes<HTMLTableRowElement> & { correct: boolean }
> = ({ correct, ...rest }) => (
  <tr className={correct ? 'bg-green-100' : 'bg-red-100'} {...rest} />
)

export const Td: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = (
  props
) => <td className="text-left p-1" {...props} />
