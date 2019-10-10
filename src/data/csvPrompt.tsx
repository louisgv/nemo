import React from 'react'
import { createPromptArray, createOptionLabel } from '../core/utils'
import {
  CatchAndProcessCsvInput,
  AggregationDisaggregationCsvInput
} from '../components/CsvFileInput'

const promptOrder = [
  'prompt_csv',
  'add_csvType',
  'comp_catchProcess',
  'comp_aggregationDisaggregation',
  'comp_shipReceive',
  'comp_transshipment',
  'prompt_anotherOne'
]

const promptStructure = {
  add_csvType: {
    hideInput: true,
    options: [
      'csv_catchProcess',
      'csv_aggregationDisaggregation',
      'csv_shipReceive',
      'csv_transshipment'
    ].map(createOptionLabel),
    triggers: [
      'comp_catchProcess',
      'comp_aggregationDisaggregation',
      'comp_shipReceive',
      'comp_transshipment'
    ]
  },
  comp_catchProcess: {
    component: <CatchAndProcessCsvInput />,
    hideInput: true,
    replace: false,
    waitAction: true,
    trigger: 'prompt_anotherOne'
  },
  comp_aggregationDisaggregation: {
    component: <AggregationDisaggregationCsvInput />,
    hideInput: true,
    replace: false,
    waitAction: true,
    trigger: 'prompt_anotherOne'
  },
  comp_shipReceive: {
    component: <AggregationDisaggregationCsvInput />,
    hideInput: true,
    replace: false,
    waitAction: true,
    trigger: 'prompt_anotherOne'
  },
  comp_transshipment: {
    component: <AggregationDisaggregationCsvInput />,
    hideInput: true,
    replace: false,
    waitAction: true,
    trigger: 'prompt_anotherOne'
  }
} as any

export const createCsvPrompt = () =>
  createPromptArray(promptOrder, promptStructure)
