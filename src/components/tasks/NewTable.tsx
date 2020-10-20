import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Input, Box } from '@chakra-ui/core'

import { useUser } from 'components/UserContext'

import { insertQueryString } from 'utils/insertQueryString'
import { Td, Table, Th, Tr, TrP, TrF } from 'components/submissions/ListTable'

import { ITask } from '../../@types/task'

export const TaskTable = ({ result, columns }) => {
  const [state, setState] = useState<ITask[]>([])
  const [query, setQuery] = useState<string>('')

  const router = useRouter()

  const {
    user: { user, passedTask },
  } = useUser()

  const realResult = useMemo(() => {
    return result.map((task: ITask) => {
      return {
        ...task,
        passed: passedTask[task[columns[0].accessor]],
      }
    })
  }, [passedTask])

  useEffect(() => {
    setQuery((router.query.q as string) || '')
  }, [router.query])

  useEffect(() => {
    setState(
      realResult.filter((task: ITask) => {
        return (
          task[columns[0].accessor].includes(query) ||
          task[columns[1].accessor].includes(query) ||
          query === ''
        )
      })
    )
  }, [user, realResult, query])

  return (
    <Box maxW="100%">
      <h2 className="font-bold leading-5 text-xl sm:text-4xl">Task</h2>
      <Input
        mt={4}
        width="200px"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value)
          insertQueryString('q', event.target.value)
        }}
        value={query}
        placeholder={`Search ${result.length} records...`}
      />
      <Box
        mt={4}
        boxShadow="var(--shadow-default)"
        borderRadius={4}
        width="1000px"
        maxW="100%"
        overflowX="auto"
        borderBottom="1px solid #E2E8F0"
      >
        <Table>
          <thead>
            <tr>
              {columns.map((data) => (
                <Th key={data.Header}>{data.Header}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.map((data: ITask) => {
              if (data.passed === true) {
                return (
                  <TrP key={data.id}>
                    {columns.map((col: any) => (
                      <Td key={col.accessor}>
                        <Link href={`/tasks/${data.id}`}>
                          <a>
                            <Box h="100%" w="100%" padding="8px 16px">
                              {data[col.accessor]}
                            </Box>
                          </a>
                        </Link>
                      </Td>
                    ))}
                  </TrP>
                )
              } else if (data.passed === false) {
                return (
                  <TrF key={data.id}>
                    {columns.map((col: any) => (
                      <Td key={col.accessor}>
                        <Link href={`/tasks/${data.id}`}>
                          <a>
                            <Box h="100%" w="100%" padding="8px 16px">
                              {data[col.accessor]}
                            </Box>
                          </a>
                        </Link>
                      </Td>
                    ))}
                  </TrF>
                )
              } else {
                return (
                  <Tr key={data.id}>
                    {columns.map((col: any) => (
                      <Td key={col.accessor}>
                        <Link href={`/tasks/${data.id}`}>
                          <a>
                            <Box h="100%" w="100%" padding="8px 16px">
                              {data[col.accessor]}
                            </Box>
                          </a>
                        </Link>
                      </Td>
                    ))}
                  </Tr>
                )
              }
            })}
          </tbody>
        </Table>
      </Box>
    </Box>
  )
}
