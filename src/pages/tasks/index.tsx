import React from 'react'
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  PoweredBy,
  HierarchicalMenu,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { PageLayout } from 'components/Layout'
import { CustomSearch, ProblemHits } from 'components/tasks/Search'
import Head from 'next/head'

const CustomSearchBox = connectSearchBox(CustomSearch)
const CustomHits = connectHits(ProblemHits)

const indexName = 'TASKS'

const searchClient = algoliasearch(
  'XKEMCTNXIE',
  'b9982af508b3c515987aa1249bed4617'
)

export default function Search() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
          integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
          crossOrigin="anonymous"
        />
      </Head>
      <PageLayout>
        <div className="flex justify-center w-full min-h-screen mx-auto">
          <InstantSearch searchClient={searchClient} indexName={indexName}>
            <div className="flex flex-col w-1/2 my-10">
              <div className="mx-auto">
                <CustomSearchBox />
                <div className="mx-auto mt-4 text-center">
                  <PoweredBy />
                </div>
              </div>
              <HierarchicalMenu
                attributes={[
                  'categories.lvl0',
                  'categories.lvl1',
                  'categories.lvl2',
                ]}
              />
              <CustomHits />
            </div>
          </InstantSearch>
        </div>
      </PageLayout>
    </>
  )
}
