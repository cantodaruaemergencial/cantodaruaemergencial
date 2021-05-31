import Chip from '#/components/Chip';
import { Color } from '#/types/Color';
import { Entrance } from '#/types/Entrance';
import { BasePerson } from '#/types/People';
import { Box, Button, Typography, withTheme } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import { ReactElement, useState } from 'react';
import { ListRowProps } from 'react-virtualized';
import styled from 'styled-components';
import TheTag from './../../Tag';

const PersonWrapper = styled(Box)`
  flex: 0 0 auto;
  height: 100%;
`;

const PersonBox = withTheme(styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    flex-direction: column;
    align-items: stretch;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
`);

const Info = withTheme(styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin-bottom: 0.75rem;
  }
`);

const Title = withTheme(styled(Typography)`
  && {
    font-weight: 600;

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const PersonInfo = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 0.75rem;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    width: 90%;
  }
`);

const Options = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Option = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    margin-left: 0;
  }
`);

const Tag = styled(TheTag)`
  min-width: 48px;
`;

interface Props {
  item: BasePerson;
  isRowLoaded: boolean;
  props: ListRowProps;
  addNewEntrance: (
    person: BasePerson,
    callback: (entrance: Entrance) => void,
  ) => void;
}

const PersonCard = ({
  item,
  isRowLoaded,
  addNewEntrance,
  props: { key, index },
}: Props): ReactElement => {
  const renderSkeleton = () => (
    <PersonWrapper key={`${key}-${index}-skeleton`}>
      <PersonBox condensed>
        <Info>
          <Skeleton variant="rect" width={64} height={24} />
          <PersonInfo>
            <Title variant="body2">
              <Skeleton variant="text" width={160} />
            </Title>
            <Typography variant="caption">
              <Skeleton variant="text" width={80} />
            </Typography>
          </PersonInfo>
        </Info>
        <Options>
          <Option>
            <Chip loading />
          </Option>
          <Option>
            <Skeleton variant="rect" width={95} height={27} />
          </Option>
        </Options>
      </PersonBox>
    </PersonWrapper>
  );

  if (!isRowLoaded) return renderSkeleton();

  const {
    Id,
    Name,
    SocialName,
    CardNumber,
    EnteredToday,
    LastEntranceDate,
  } = item;

  const [entrance, setEntrance] = useState({ LastEntranceDate, EnteredToday });

  const lastEntranceLabel = () => {
    if (entrance.LastEntranceDate === null) return 'Nunca entrou';

    const text = entrance.EnteredToday ? 'Entrou ' : 'Últ. vez ';

    const fromText = moment(entrance.LastEntranceDate).fromNow();

    return text + fromText;
  };

  const getColor = () => {
    if (entrance.EnteredToday) return Color.success;
    if (entrance.LastEntranceDate !== null) return Color.info;
    return Color.disabled;
  };

  const updateItem = (lastEntrance: Entrance) =>
    setEntrance({
      LastEntranceDate: lastEntrance.DateTime,
      EnteredToday: true,
    });

  return (
    <PersonWrapper key={Id}>
      <PersonBox condensed>
        <Info>
          <Tag label={CardNumber} color={getColor()} />
          <PersonInfo>
            <Title variant="body2">{Name}</Title>
            {SocialName && (
              <Typography variant="caption">{SocialName}</Typography>
            )}
          </PersonInfo>
        </Info>
        <Options>
          <Option>
            <Chip label={lastEntranceLabel()} color={getColor()} />
          </Option>
          {!entrance.EnteredToday && (
            <Option>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddCircleRounded />}
                onClick={() => addNewEntrance(item, updateItem)}
              >
                Entrada
              </Button>
            </Option>
          )}
        </Options>
      </PersonBox>
    </PersonWrapper>
  );
};

export default PersonCard;
