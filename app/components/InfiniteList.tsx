/* eslint-disable react/prop-types */
import { Box } from '@material-ui/core';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps,
} from 'react-virtualized';

import EmptyState from './EmptyState';

export type InfiniteListRowRenderer = (
  item: any,
  isRowLoaded: boolean,
  props: ListRowProps,
) => ReactNode;

export type InfiniteListFetchRows = (
  startIndex: number,
  limit: number,
  filter: any,
) => Promise<any>;

interface Props {
  fetchRows: InfiniteListFetchRows;
  rowRenderer: InfiniteListRowRenderer;
  filter?: any;
  className?: string;
}

const InfiniteList = ({ fetchRows, rowRenderer, filter, className }: Props) => {
  const [list, setList] = useState<any[]>([]);

  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  let infiteLoaderRef: InfiniteLoader | null = null;

  const rowCount = hasNextPage ? list.length + 8 : list.length;

  const cellMeasurerCache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 50,
      }),
    [],
  );

  const isRowLoaded = ({ index }: ListRowProps | Index) => Boolean(list[index]);

  const getItem = ({ index }: ListRowProps) => list[index];

  const resetList = () => {
    setList([]);
    setHasNextPage(true);

    if (!infiteLoaderRef) return;
    infiteLoaderRef.resetLoadMoreRowsCache();
  };

  const loadMoreRows = ({
    startIndex,
    stopIndex,
  }: IndexRange): Promise<any> => {
    const limit = stopIndex - startIndex;
    return fetchRows(startIndex, limit, filter).then((result) => {
      setHasNextPage(result.length > 0);
      setList([...list, ...result]);
    });
  };

  const handleRowRender = (props: ListRowProps) => {
    const { key, index, parent, style } = props;

    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure, registerChild }) => (
          // @ts-ignore
          <Box onLoad={measure} ref={registerChild} style={style}>
            {rowRenderer(getItem(props), isRowLoaded(props), props)}
          </Box>
        )}
      </CellMeasurer>
    );
  };

  useEffect(() => {
    const filterIsEmpty = Object.keys(filter).length === 0;

    if (filterIsEmpty) return;

    resetList();
  }, [filter]);

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      className={className}
      ref={(child) => {
        infiteLoaderRef = child;
      }}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              tabIndex={-1}
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowCount={rowCount}
              noRowsRenderer={() => <EmptyState />}
              rowRenderer={handleRowRender}
              deferredMeasurementCache={cellMeasurerCache}
              rowHeight={cellMeasurerCache.rowHeight}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteList;
