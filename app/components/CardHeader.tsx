import { Box, Typography, withTheme } from '@material-ui/core';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Title = withTheme(styled(Typography)`
  && {
    font-weight: 700;
    font-size: 0.9rem;

    &.contrast {
      color: ${({ theme }) => theme.palette.primary.contrastText};
      opacity: 0.8;
    }
  }
`);

const Description = withTheme(styled(Typography)``);

interface Props {
  title: string;
  description?: string | null;
  sideComponent?: ReactNode;
  contrast?: boolean;
  className?: string;
}

const CardHeader = ({
  title,
  description,
  contrast = false,
  sideComponent,
  className,
}: Props) => (
  <Header className={className}>
    <Box>
      <Title color="textPrimary" className={clsx({ contrast })}>
        {title}
      </Title>
      {description && (
        <Description variant="caption">{description}</Description>
      )}
    </Box>
    {sideComponent}
  </Header>
);

export default CardHeader;
