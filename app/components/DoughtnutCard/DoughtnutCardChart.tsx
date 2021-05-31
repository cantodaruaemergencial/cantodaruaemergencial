import { Box, NoSsr, useTheme } from '@material-ui/core';
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
  format?: Format;
  className?: string;
}

const TheDoughtnutCardChart = ({
  values,
  format = Format.number,
  className,
}: Props) => {
  const theme = useTheme();

  const getColorOpacity = (index: number) => {
    const percentage = (values.length - index) / values.length;
    const alpha = Math.round(percentage * 255);
    const hex = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
    return hex;
  };

  const getBackgroundColors = () =>
    values.map((_, i) => theme.palette.primary.main + getColorOpacity(i));

  const getLabels = () => values.map((v) => v.name);

  const getDataset = (): any => ({
    data: values.map((v) => v.total),
    backgroundColor: getBackgroundColors(),
    borderColor: 'transparent',
  });

  const getChartOptions = (): any => ({
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
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

  return (
    <ChartWrapper className={className}>
      <NoSsr>
        <Chart
          type="doughnut"
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

const DoughtnutCardChart = React.memo(TheDoughtnutCardChart, propsAreEqual);

export default DoughtnutCardChart;
