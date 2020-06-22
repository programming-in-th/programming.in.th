import React, { useState, useCallback } from 'react'
import Router from 'next/router'
import {
  Flex,
  Box,
  Heading,
  Button,
  Text,
  Select,
  Input,
} from '@chakra-ui/core'
import debounce from 'lodash/debounce'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import matchSorter from 'match-sorter'

import { Td, Table, Th, Tr } from 'components/submissions/ListTable'

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useCallback(
    debounce((value: string) => setGlobalFilter(value || undefined), 100),
    []
  )

  return (
    <Input
      width="200px"
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = (val) => !val

export const TaskTable = ({ result, columns }) => {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  )

  const instance = useTable(
    { columns, data: result, initialState: { pageIndex: 0 }, filterTypes },
    useGlobalFilter,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    pageCount,
    page,
    state: { pageIndex, pageSize, globalFilter },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = instance

  return (
    <Box maxW="100%">
      <Heading>Task</Heading>
      <Box mt={4}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Box
          mt={4}
          boxShadow="var(--shadow-default)"
          borderRadius={4}
          width="1000px"
          maxW="100%"
          overflowX="scroll"
          borderBottom="1px solid #E2E8F0"
        >
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </Th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <Tr
                    {...row.getRowProps()}
                    onClick={() =>
                      Router.push(`/tasks/[...id]`, `/tasks/${row.original.id}`)
                    }
                  >
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      )
                    })}
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        </Box>
        <Flex
          mt={4}
          align="center"
          direction={['column', 'row']}
          justify={['unset', 'space-between']}
        >
          <Flex align="center">
            <Flex align="baseline">
              <Button
                size="xs"
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
              >
                {'<<'}
              </Button>
              <Button
                ml={1}
                size="xs"
                onClick={() => previousPage()}
                isDisabled={!canPreviousPage}
              >
                {'<'}
              </Button>
              <Button
                ml={1}
                size="xs"
                onClick={() => nextPage()}
                isDisabled={!canNextPage}
              >
                {'>'}
              </Button>
              <Button
                ml={1}
                size="xs"
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
              >
                {'>>'}
              </Button>{' '}
            </Flex>
            <Text ml={2}>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </Text>
          </Flex>

          <Flex mt={[2, 0]} align="center">
            <Flex ml={2} align="baseline">
              <Text>Go to page:</Text>
              <Input
                ml={1}
                type="number"
                size="sm"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </Flex>
            <Select
              ml={1}
              size="sm"
              width="120px"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
