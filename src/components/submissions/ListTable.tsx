export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (
  props
) => <table className="w-full border-collapse whitespace-no-wrap" {...props} />

export const Th: React.FC<React.ThHTMLAttributes<
  HTMLTableHeaderCellElement
>> = (props) => (
  <th
    className="text-left tracking-wider text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300 py-2 px-4"
    {...props}
  />
)

export const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (
  props
) => (
  <tr
    className="cursor-pointer transition duration-200 hover:bg-gray-100 hover:border-l hover:border-gray-300"
    {...props}
  />
)

export const Td: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = (
  props
) => <td className="text-left" {...props} />

export const TdHide: React.FC<React.TdHTMLAttributes<
  HTMLTableDataCellElement
>> = (props) => <td className="h-10" {...props} />
