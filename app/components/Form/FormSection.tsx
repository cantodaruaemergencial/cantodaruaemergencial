import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import Card from '../Card';

import FormField from './FormField';

import { FormSection as FormSectionType } from '#/types/Forms';

const Container = styled(Card)`
  margin-bottom: 1rem;
`;

const Title = styled(Typography)`
  && {
    margin-bottom: 2rem;
  }
`;

interface Props {
  className?: string;
  section: FormSectionType;
  control: any;
}

const FormSection = ({
  section: { label, fields },
  control,
  className,
}: Props) => (
  <Container className={className}>
    <Title variant="h4">{label}</Title>
    {fields.map((f) => (
      <FormField key={f.property} field={f} control={control} />
    ))}
  </Container>
);

export default FormSection;
