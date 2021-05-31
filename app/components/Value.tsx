import { Box, Typography, withTheme } from '@material-ui/core';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

import { Numerals } from '../utils/numerals';

import { Format } from '#/types/Format';

const Container = styled(Box)`
  display: flex;
`;

const ValueContainer = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;

  &.alignCenter {
    text-align: center;
    margin: 0 auto;
  }

  &.alignRight {
    text-align: right;
    align-items: flex-end;
  }

  &.small {
    .value {
      font-weight: 600;
      font-size: 0.8rem;
      line-height: 1.8;
    }

    .label {
      font-size: 0.65rem;
      font-weight: 600;
      line-height: 1;
    }
  }

  &.medium {
    .value {
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.8;
    }

    .label {
      font-size: 0.7rem;
      font-weight: 600;
      line-height: 1;
    }
  }

  &.inline {
    flex-direction: row;
    align-items: baseline;

    .label {
      margin-left: 0.25rem;
    }
  }

  &.light {
    .value {
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    .label {
      color: ${({ theme }) => theme.palette.primary.contrastText};
      opacity: 0.8;
    }
  }
`);

const ValueNumber = styled(Typography)`
  && {
    line-height: 1.25;
    font-size: 2em;
    font-weight: 700;
  }
`;

const Label = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 0.8rem;
  }
`;

const GrowthContainer = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.palette.success.main};

  .MuiSvgIcon-root {
    font-size: 2rem;
    margin-bottom: -0.2rem;
    fill: ${({ theme }) => theme.palette.success.main};
  }

  &.negative {
    color: ${({ theme }) => theme.palette.error.main};

    .MuiSvgIcon-root {
      transform: scaleY(-1);
      fill: ${({ theme }) => theme.palette.error.main};
    }
  }
`);

const Growth = styled(Typography)`
  && {
    font-size: 0.6rem;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 0.25rem;
  }
`;

interface Props {
  format?: Format;
  value: number | string;
  label?: string;
  alignCenter?: boolean;
  alignRight?: boolean;
  small?: boolean;
  medium?: boolean;
  inline?: boolean;
  light?: boolean;
  growth?: number;
  className?: string;
}

const Value = ({
  format = Format.number,
  value,
  label,
  alignCenter = false,
  alignRight = false,
  small = false,
  medium = false,
  inline = false,
  light = false,
  growth,
  className,
}: Props) => {
  const valueNumber =
    typeof value === 'number' ? Numerals.format(value, format) : value;

  const renderGrowth = () => {
    const growthNumber = growth || 0;

    return (
      <GrowthContainer className={clsx({ negative: growthNumber < 0 })}>
        <TrendingUpRoundedIcon />
        <Growth>{Numerals.formatPercentageWithSign(growthNumber)}</Growth>
      </GrowthContainer>
    );
  };

  return (
    <Container className={className}>
      <ValueContainer
        className={clsx({ small, medium, inline, alignCenter, alignRight, light })}
      >
        <ValueNumber color="textPrimary" className="value">
          {valueNumber}
        </ValueNumber>
        {label && (
          <Label className="label" color="textSecondary">
            {label}
          </Label>
        )}
      </ValueContainer>
      {growth != null && renderGrowth()}
    </Container>
  );
};

export default Value;
