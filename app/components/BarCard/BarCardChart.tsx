import { Box, NoSsr } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import Chart from '../Chart';

import { DashboardTotalByCategory } from '#/types/Dashboard';
import { Format } from '#/types/Format';

const ChartWrapper = styled(Box)`
  flex: 1;
`;

interface Props {
  values: DashboardTotalByCategory[];
  horizontal?: boolean;
  format?: Format;
  className?: string;
}

const TheBarCardChart = ({
  values,
  horizontal = false,
  format = Format.number,
  className,
}: Props) => {
  const indexAxis = horizontal ? 'y' : 'x';

  const otherAxis = !horizontal ? 'y' : 'x';

  const getLabels = () => values.map((v) => v.name);

  const getDataset = (): any => ({
    data: values.map((v) => v.total),
    maxBarThickness: 32,
    borderRadius: 4,
  });

  const getChartOptions = (): any => ({
    indexAxis,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      [indexAxis]: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkipPadding: 24,
          maxRotation: 0,
        },
      },
      [otherAxis]: {
        display: false,
      },
    },
  });

  return (
    <ChartWrapper className={className}>
      <NoSsr>
        <Chart
          type="bar"
          format={format}
          labels={getLabels()}
          dataset={getDataset()}
          options={getChartOptions()}
        />
      </NoSsr>
    </ChartWrapper>
  );
};

const propsAreEqual = (prevProps: Props, nextProps: Props) =>
  prevProps.values === nextProps.values;

const BarCardChart = React.memo(TheBarCardChart, propsAreEqual);

export default BarCardChart;
