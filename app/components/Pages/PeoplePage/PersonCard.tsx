import Chip from '#/components/Chip';
import { Color } from '#/types/Color';
import { Entrance } from '#/types/Entrance';
import { BasePerson } from '#/types/People';
import { Person } from '#/types/People';
import { Box, Button, Typography, withTheme, Tooltip } from '@material-ui/core';
import {
  AddCircleRounded,
  InfoRounded,
  PanToolRounded,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { ListRowProps } from 'react-virtualized';
import styled from 'styled-components';
import TheTag from './../../Tag';
import PersonCardModal from '#/components/PersonCardModal';
import PeopleService from '#/services/PeopleService';

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
    background-color: rgba(0, 0, 0, 0.05);
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
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

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
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

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
          </PersonInfo>
        </Info>
        <Options>
          <Chip loading />
          <Skeleton variant="rect" width={95} height={27} />
        </Options>
      </PersonBox>
    </PersonWrapper>
  );

  if (!isRowLoaded) return renderSkeleton();

  const {
    id: Id,
    Preferential,
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

  const [personModal, setPersonModal] = useState<{
    person: Person | null;
    open: boolean;
  }>({ open: false, person: null });

  const showPersonCardModal = (person: Person) =>
    setPersonModal({ open: true, person });

  const handleClosePersonCardModal = () => {
    setPersonModal({ ...personModal, open: false });
  };

  return (
    <PersonWrapper key={Id}>
      <PersonBox condensed>
        <Info>
          <Tag label={CardNumber} color={getColor()} />
          <PersonInfo>
            <Link href={`/pessoas/cadastro/${Id}`}>
              <Title variant="body2">
                {Preferential && (
                  <Tooltip title="Preferencial">
                    <PanToolRounded style={{ fill: 'rgb(76, 175, 80)' }} />
                  </Tooltip>
                )}
                {Name}
              </Title>
            </Link>
            {SocialName && (
              <Typography variant="caption">{SocialName}</Typography>
            )}
          </PersonInfo>
        </Info>
        <Options>
          <Chip
            label={lastEntranceLabel()}
            color={getColor()}
            tooltip={moment(entrance.LastEntranceDate)
              .format('DD/MM/YYYY HH:mm')
              .toString()}
          />
          {!entrance.EnteredToday && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddCircleRounded />}
              onClick={() => addNewEntrance(item, updateItem)}
            >
              Entrada
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            startIcon={<InfoRounded />}
            onClick={async () => {
              const people = await PeopleService.getPerson(item.id);
              showPersonCardModal(people);
            }}
          >
            Cartão
          </Button>
        </Options>
      </PersonBox>
      <PersonCardModal
        {...personModal}
        handleClose={handleClosePersonCardModal}
        newPerson={false}
      />
    </PersonWrapper>
  );
};

export default PersonCard;
