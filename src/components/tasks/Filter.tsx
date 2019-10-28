import React from 'react'
import { Input, Select, Slider, Switch, Icon } from 'antd'
import { SliderValue } from 'antd/lib/slider'

import { FilterWrapper, SubFilterWrapper } from '../atomics'

const { Option } = Select

export interface IFilter {
  tagList: string[]
  searchWord: string
  searchTag: string[]
  hideTag: boolean
  searchDifficulty: number[]
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void
  handleTag: (value: Array<string>) => void
  handleDifficulty: (value: SliderValue) => void
  handleHideTag: (check: boolean) => void
}

export const FilterComponent: (props: IFilter) => any = props => {
  return (
    <FilterWrapper>
      <SubFilterWrapper>
        Search:
        <Input
          defaultValue={props.searchWord}
          placeholder="Enter Problem ID or Title"
          onChange={e => props.handleSearch(e)}
          style={{ margin: 10 }}
        />
      </SubFilterWrapper>
      <SubFilterWrapper>
        <p>Tag:</p>
        {'  '}
        <Select
          mode="multiple"
          style={{ width: '100%', marginLeft: '10px' }}
          placeholder="Please select"
          defaultValue={props.searchTag as Array<string>}
          onChange={props.handleTag}
          disabled={props.hideTag}
        >
          {props.tagList.map(value => {
            return <Option key={value}>{value}</Option>
          })}
        </Select>
      </SubFilterWrapper>
      <SubFilterWrapper>
        <p>Difficulty:</p>
        {'  '}
        <Slider
          range
          min={0}
          max={10}
          style={{ width: '100%', marginLeft: '20px' }}
          defaultValue={props.searchDifficulty as SliderValue}
          onChange={props.handleDifficulty}
        />
      </SubFilterWrapper>
      <SubFilterWrapper>
        <p>Hide Tag:</p>
        <Switch
          style={{ marginLeft: 10 }}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          defaultChecked={props.hideTag}
          onChange={props.handleHideTag}
        />
      </SubFilterWrapper>
    </FilterWrapper>
  )
}
