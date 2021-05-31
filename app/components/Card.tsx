import {
  Box,
  Card as MuiCard,
  CardProps,
  Typography,
  withTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledCard = withTheme(styled(MuiCard)`
  && {
    padding: 2rem 1.5rem;

    &.condensed {
      padding: 1.25rem 1rem;
    }

    &.rounder {
      border-radius: 16px;
    }

    &.primary {
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`);

const CardHeader = styled(Box)``;

const Title = styled(Typography)`
  && {
    margin-bottom: 1rem;
  }
`;

interface Props extends CardProps {
  title?: string;
  children?: ReactNode;
  condensed?: boolean;
  rounder?: boolean;
  primary?: boolean;
}

const Card = ({
  title,
  children,
  condensed = false,
  rounder = false,
  primary = false,
  className,
  ...props
}: Props) => (
  <StyledCard
    {...props}
    className={clsx(className, { condensed, rounder, primary })}
  >
    {title && (
      <CardHeader>
        <Title variant="h4">{title}</Title>
      </CardHeader>
    )}
    {children}
  </StyledCard>
);

export default Card;
