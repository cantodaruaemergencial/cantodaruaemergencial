import { Chip as MuiChip } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import {
  CheckCircleRounded,
  ErrorRounded,
  InfoRounded,
  RemoveCircleRounded,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { Color } from '#/types/Color';

const CustomChip = withTheme(styled(MuiChip)`
  &.success {
    background-color: ${({ theme }) => `${theme.palette.success.light}30`};
    color: ${({ theme }) => theme.palette.success.dark};

    .MuiSvgIcon-root {
      fill: ${({ theme }) => theme.palette.success.dark};
    }
  }

  &.error {
    background-color: ${({ theme }) => `${theme.palette.error.light}30`};
    color: ${({ theme }) => theme.palette.error.dark};

    .MuiSvgIcon-root {
      fill: ${({ theme }) => theme.palette.error.dark};
    }
  }

  &.info {
    background-color: ${({ theme }) => `${theme.palette.info.light}30`};
    color: ${({ theme }) => theme.palette.info.dark};

    .MuiSvgIcon-root {
      fill: ${({ theme }) => theme.palette.info.dark};
    }
  }

  &.MuiChip-sizeSmall {
    && {
      font-weight: 600;
      font-size: 0.65rem;
    }
  }
`);

const ChipSkeleton = styled(Skeleton)`
  && {
    border-radius: 24px;
  }
`;

interface Props {
  label?: string;
  color?: Color;
  loading?: boolean;
  className?: string;
}

const Chip = ({
  label,
  color,
  className,
  loading = false,
}: Props): ReactElement => {
  if (loading) return <ChipSkeleton variant="rect" width={100} height={24} />;

  const getAvatar = () => {
    switch (color) {
      case Color.success:
        return <CheckCircleRounded />;
      case Color.info:
        return <InfoRounded />;
      case Color.error:
        return <ErrorRounded />;
      case Color.disabled:
        return <RemoveCircleRounded />;
      default:
        return null;
    }
  };

  const getClassColor = () => ({
    default: Color.default === color,
    success: Color.success === color,
    error: Color.error === color,
    info: Color.info === color,
    disabled: Color.disabled === color,
  });

  return (
    <CustomChip
      className={clsx(className, getClassColor())}
      label={label}
      avatar={getAvatar()}
      size="small"
    />
  );
};

export default Chip;
