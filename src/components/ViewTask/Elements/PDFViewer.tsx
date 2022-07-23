import * as React from 'react'
import { Viewer } from '@react-pdf-viewer/core'
import { SearchIcon } from '@react-pdf-viewer/search'
import {
  MoreActionsPopover,
  ToolbarProps,
  ToolbarSlot
} from '@react-pdf-viewer/toolbar'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import type { DocumentLoadEvent } from '@react-pdf-viewer/core'

import SearchSidebar from './SearchSidebar'

interface SearchSidebarDefaultLayoutProps {
  fileUrl: string
  keywords: string[]
}

interface DocumentKeywordsData {
  isDocumentLoaded: boolean
  keywords: string[]
}

const compareArrays = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

const PDFViewer: React.FC<SearchSidebarDefaultLayoutProps> = ({
  fileUrl,
  keywords
}) => {
  const [docKeywords, setDocKeywords] = React.useState<DocumentKeywordsData>({
    isDocumentLoaded: false,
    keywords
  })
  const [searchKeywords, setSearchKeywords] = React.useState(keywords)

  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => (
    <Toolbar>
      {(toolbarSlot: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Open,
          Print,
          SwitchTheme,
          Zoom,
          ZoomIn,
          ZoomOut
        } = toolbarSlot

        return (
          <div
            className="rpv-toolbar"
            role="toolbar"
            aria-orientation="horizontal"
          >
            <div className="rpv-toolbar__left">
              <div className="rpv-core__display--hidden rpv-core__display--block-small">
                <div className="rpv-toolbar__item">
                  <GoToPreviousPage />
                </div>
              </div>
              <div className="rpv-toolbar__item">
                <CurrentPageInput />{' '}
                <span className="rpv-toolbar__label">
                  / <NumberOfPages />
                </span>
              </div>
              <div className="rpv-core__display--hidden rpv-core__display--block-small">
                <div className="rpv-toolbar__item">
                  <GoToNextPage />
                </div>
              </div>
            </div>
            <div className="rpv-toolbar__center">
              <div className="rpv-toolbar__item">
                <ZoomOut />
              </div>
              <div className="rpv-core__display--hidden rpv-core__display--block-small">
                <div className="rpv-toolbar__item">
                  <Zoom />
                </div>
              </div>
              <div className="rpv-toolbar__item">
                <ZoomIn />
              </div>
            </div>
            <div className="rpv-toolbar__right">
              <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                <div className="rpv-toolbar__item">
                  <SwitchTheme />
                </div>
              </div>
              <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                <div className="rpv-toolbar__item">
                  <EnterFullScreen />
                </div>
              </div>
              {/* <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                <div className="rpv-toolbar__item">
                  <Open />
                </div>
              </div> */}
              <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                <div className="rpv-toolbar__item">
                  <Download />
                </div>
              </div>
              <div className="rpv-core__display--hidden rpv-core__display--block-medium">
                <div className="rpv-toolbar__item">
                  <Print />
                </div>
              </div>
              <div className="rpv-toolbar__item">
                <MoreActionsPopover toolbarSlot={toolbarSlot} />
              </div>
            </div>
          </div>
        )
      }}
    </Toolbar>
  )

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: defaultTabs =>
      [
        {
          content: (
            <SearchSidebar
              isDocumentLoaded={docKeywords.isDocumentLoaded}
              keywords={searchKeywords}
              searchPluginInstance={
                defaultLayoutPluginInstance.toolbarPluginInstance
                  .searchPluginInstance
              }
            />
          ),
          icon: <SearchIcon />,
          title: 'Search'
        }
      ].concat(defaultTabs)
  })

  const { activateTab } = defaultLayoutPluginInstance

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    setDocKeywords({
      isDocumentLoaded: true,
      keywords
    })
  }

  React.useLayoutEffect(() => {
    // Open the search tab if we pass the new keywords
    if (
      docKeywords &&
      docKeywords.isDocumentLoaded &&
      docKeywords.keywords.length > 0
    ) {
      setSearchKeywords(docKeywords.keywords)
      activateTab(0)
    }
  }, [docKeywords])

  React.useLayoutEffect(() => {
    setDocKeywords({
      isDocumentLoaded: false,
      keywords: ['']
    })
  }, [fileUrl])

  React.useLayoutEffect(() => {
    setDocKeywords(currentValue =>
      keywords &&
      currentValue &&
      currentValue.isDocumentLoaded &&
      !compareArrays(currentValue.keywords, keywords)
        ? { isDocumentLoaded: true, keywords }
        : currentValue
    )
  }, [keywords])

  return (
    <Viewer
      fileUrl={fileUrl}
      onDocumentLoad={handleDocumentLoad}
      // Since we always open the sidebar, it's better to set the default scale
      // so the main body of `Viewer` fit in its container
      defaultScale={1.0}
      plugins={[defaultLayoutPluginInstance]}
    />
  )
}

export default PDFViewer
