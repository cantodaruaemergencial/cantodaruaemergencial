import { Box, Tooltip, Typography, withTheme } from '@material-ui/core';
import { Cancel, Check } from '@material-ui/icons';
import { TimelineOppositeContent } from '@material-ui/lab';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { PersonHistory } from '#/types/PersonHistory';
import { PastoralDeRuaServiceAttendance } from '#/types/PastoralServiceAttendance';
import { Entrance } from '#/types/Entrance';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import moment from 'moment';
import { listHistoryData } from './ListHistoryPageUtils';
import { FormTypes } from '#/components/PersonModalCard/PersonModalCardUtils';

const ListHistoryWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled(Box)`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

const OuterSectionWrapper = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
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

const SectionWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Title = withTheme(styled(Typography)`
  && {
    font-weight: 600;
    font-size: 24px;

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const Description = withTheme(styled(Typography)`
  && {
    font-weight: 500;
    font-size: 18px;

    ${({ theme }) => theme.breakpoints.down('xs')} {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`);

const TimelineWrapper = withTheme(styled(Timeline)`
  display: flex;
  flex-direction: column;

  width: 100%;
`);

const TimelineItemWrapper = withTheme(styled(TimelineItem)`
  height: 100%;
`);

const Field = withTheme(styled(Box)`
  grid-column: 1 / 3;
  position: relative;
  border-radius: 4px;
`);

const HalfField = styled(Field)`
  grid-column: auto;
`;

const Label = styled(Typography)`
  && {
    font-size: 0.7em;
    font-weight: bold;
  }
`;

const Value = styled(Typography)`
  && {
    font-size: 1em;
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.bigger {
      font-weight: bold;
      font-size: 2.5em;
    }
  }
`;

const CustomTooltip = styled(Tooltip)`
  && {
    font-size: 1em;
  }
`;

interface Props {
  item: PersonHistory;
}

const ListHistoryPage = ({ item }: Props): ReactElement => {
  const { attendances, entrances } = item;

  const renderAttendances = (
    personAttendances: PastoralDeRuaServiceAttendance[],
  ) => {
    return (
      <SectionWrapper>
        <Title>Atendimentos</Title>
        <TimelineWrapper align="alternate">
          {personAttendances.length === 0 ? (
            <Description>Não há dados cadastrados</Description>
          ) : (
            personAttendances?.map((pa, index) => (
              <TimelineItemWrapper>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {moment(pa.service_attendance_date).format(
                      'DD-MM-YYYY HH:mm:ss',
                    )}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant={!index ? 'default' : 'outlined'}>
                    <AddLocationIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Wrapper key={pa.id}>
                    {listHistoryData(pa).map((i) => (
                      <HalfField>
                        <Label>{i.label}</Label>
                        {i.type === FormTypes.bool ? (
                          i.value ? (
                            <Check color="secondary" />
                          ) : (
                            <Cancel color="error" />
                          )
                        ) : (
                          <CustomTooltip title={i.value?.toString() || ''}>
                            <Value>{i.value?.toString() || '-'}</Value>
                          </CustomTooltip>
                        )}
                      </HalfField>
                    ))}
                  </Wrapper>
                </TimelineContent>
              </TimelineItemWrapper>
            ))
          )}
        </TimelineWrapper>
      </SectionWrapper>
    );
  };

  const renderEntrances = (personEntrances: Entrance[]) => {
    return (
      <SectionWrapper>
        <Title>Entradas</Title>
        <TimelineWrapper align="alternate">
          {personEntrances.length === 0 ? (
            <Description>Não há dados cadastrados</Description>
          ) : (
            personEntrances?.map((pe, index) => (
              <TimelineItemWrapper>
                <TimelineSeparator>
                  <TimelineDot color={!index ? 'primary' : 'grey'}>
                    <DirectionsRunIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {moment(pe.date).format('DD-MM-YYYY HH:mm:ss')}
                </TimelineContent>
              </TimelineItemWrapper>
            ))
          )}
        </TimelineWrapper>
      </SectionWrapper>
    );
  };

  return (
    <ListHistoryWrapper>
      <OuterSectionWrapper>{renderEntrances(entrances)}</OuterSectionWrapper>
      <OuterSectionWrapper>
        {renderAttendances(attendances)}
      </OuterSectionWrapper>
    </ListHistoryWrapper>
  );
};

export default ListHistoryPage;
