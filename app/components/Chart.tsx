import { useTheme } from '@material-ui/core';
import { ChartOptions, ChartType, DatasetChartOptions } from 'chart.js';
import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import { Format } from '#/types/Format';
import { Numerals } from '#/utils/numerals';

const defaultData = {
  labels: [],
  datasets: [
    {
      label: '',
      borderColor: '#fff',
      borderJoinStyle: 'miter',
      pointHoverRadius: 5,
      fill: true,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 10,
      borderWidth: 1,
      data: [],
    },
  ],
};

const getDefaultOptions = (
  format: Format,
  tooltipCallbacksTitle?: (tooltipItem: any) => string,
) => ({
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 24,
      right: 24,
      top: 24,
      bottom: 24,
    },
  },
  scales: {
    xAxes: [
      {
        barPercentage: 1,
        ticks: {
          display: false,
          padding: 0,
        },
        gridLines: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
          padding: 0,
        },
        gridLines: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      title:
        tooltipCallbacksTitle ||
        ((tooltipItem: any, data: any) => {
          const label = tooltipItem[0].xLabel;
          return !label ? data.labels[tooltipItem[0].index] : label;
        }),
      label: (tooltipItem: any, data: any) => {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const label = `${dataset.label}: ` || '';
        const value = Numerals.format(tooltipItem.yLabel, format);
        return label + value;
      },
    },
  },
});

interface Props {
  labels?: string[];
  dataset: DatasetChartOptions;
  options: ChartOptions;
  type: ChartType | 'horizontalBar';
  format?: Format;
  tooltipCallbacksTitle?: (tooltipItem: any) => string;
}

const Chart = ({
  type = 'bar',
  labels = [],
  dataset,
  options,
  format = Format.number,
  tooltipCallbacksTitle,
}: Props) => {
  const theme = useTheme();

  const getColorProperties = () => {
    const color = `${theme.palette.primary.main}C2`;

    return {
      borderColor: color,
      pointBackgroundColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
      backgroundColor: color,
    };
  };

  const customizedData = () => {
    const colorProperties = getColorProperties();

    const datasets = [
      {
        ...defaultData.datasets[0],
        ...colorProperties,
        ...dataset,
      },
    ];

    return {
      ...defaultData,
      labels,
      datasets,
    };
  };

  const customizedOptions = {
    ...getDefaultOptions(format, tooltipCallbacksTitle),
    ...options,
  };

  switch (type) {
    case 'doughnut':
      return (
        <Doughnut
          type="doughnut"
          data={customizedData}
          options={customizedOptions}
        />
      );
    case 'bar':
      return (
        <Bar type="bar" data={customizedData} options={customizedOptions} />
      );
    default:
      return (
        <Line type="line" data={customizedData} options={customizedOptions} />
      );
  }
};

export default Chart;
