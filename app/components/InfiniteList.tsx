/* eslint-disable react/prop-types */
import { FC } from 'react';
import { Box } from '@mui/material';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  CellMeasurer as _CellMeasurer,
  CellMeasurerProps,
  CellMeasurerCache,
  Index,
  IndexRange,
  InfiniteLoader as _InfiniteLoader,
  InfiniteLoaderProps,
  List as _List,
  ListProps,
  ListRowProps,
} from 'react-virtualized';

const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;
const CellMeasurer = _CellMeasurer as unknown as FC<CellMeasurerProps>;
const InfiniteLoader = _InfiniteLoader as unknown as FC<InfiniteLoaderProps>;
const List = _List as unknown as FC<ListProps>;

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

  let infiteLoaderRef: _InfiniteLoader | null = null;

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
      console.log({ result });
      setHasNextPage(result.length > 0);
      if (Array.isArray(result)) {
        setList([...list, ...result]);
      }
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
      ref={(child: any) => {
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
