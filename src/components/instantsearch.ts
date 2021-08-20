import { findResultsState } from 'react-instantsearch-dom/server'
import algoliasearch from 'algoliasearch/lite'

const indexName = 'TASKS'

// Keys are supplied from Algolio's instant search example
// https://github.com/algolia/react-instantsearch
const searchClient = algoliasearch(
  'XKEMCTNXIE',
  '1dace078ce8d92bb8e205eb517fba263'
)

export { findResultsState, indexName, searchClient }
