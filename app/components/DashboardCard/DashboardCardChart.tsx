import { Box, NoSsr } from '@material-ui/core';
import moment, { Moment } from 'moment';
import React from 'react';
import styled from 'styled-components';

import Chart from '../Chart';

import { DashboardCardHistoricalValue } from '#/types/Dashboard';
import { Format } from '#/types/Format';

const ChartWrapper = styled(Box)`
  flex: 1;
`;

interface Props {
  values: DashboardCardHistoricalValue[];
  format?: Format;
  className?: string;
}

const TheDashboardCardChart = ({
  values,
  format = Format.number,
  className,
}: Props) => {
  const formatLabel = (x: Moment) => moment(x).format('MMMM YYYY');

  const getLabels = () => values.map((v) => formatLabel(v.date));

  const getDataset = (): any => ({
    data: values.map((v) => ({ x: v.date, y: v.value })),
    maxBarThickness: 32,
    tension: 0.2,
  });

  const getChartOptions = (): any => ({
    layout: {
      padding: 0,
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  });

  const tooltipCallbacksTitle = (tooltipItem: any) =>
    formatLabel(tooltipItem[0].xLabel);

  return (
    <ChartWrapper className={className}>
      <NoSsr>
        <Chart
          type="line"
          format={format}
          labels={getLabels()}
          dataset={getDataset()}
          options={getChartOptions()}
          tooltipCallbacksTitle={tooltipCallbacksTitle}
        />
      </NoSsr>
    </ChartWrapper>
  );
};

const propsAreEqual = (prevProps: Props, nextProps: Props) =>
  prevProps.values === nextProps.values;

const DashboardCardChart = React.memo(TheDashboardCardChart, propsAreEqual);

export default DashboardCardChart;
