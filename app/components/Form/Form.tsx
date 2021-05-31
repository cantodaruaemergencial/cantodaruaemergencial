import { Box, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import FormSection from './FormSection';

import { FieldType, Form as FormType, FormField } from '#/types/Forms';

const Container = styled(Box)``;

const TheForm = styled.form`
  width: 100%;
`;

const Buttons = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 3rem;
`;

interface Props {
  className?: string;
  form: FormType;
  onSubmit: (data: { [key: string]: unknown }) => Promise<void>;
}

const Form = ({ form, onSubmit, className }: Props) => {
  const getDefaultValues = () => {
    const defaultValues: { [key: string]: unknown } = {};

    const getDefaultValue = (field: FormField) => {
      switch (field.type) {
        case FieldType.boolean:
          return false;
        case FieldType.selectMultiple:
          return [];
        case FieldType.select:
        case FieldType.input:
        case FieldType.number:
          return '';
        default:
          return null;
      }
    };

    form.sections.forEach((s) => {
      s.fields.forEach((f) => {
        defaultValues[f.property] = getDefaultValue(f);
      });
    });

    return defaultValues;
  };

  const { control, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: getDefaultValues(),
  });

  return (
    <Container className={className}>
      <TheForm onSubmit={handleSubmit(onSubmit)}>
        {form.sections.map((s) => (
          <FormSection key={s.label} section={s} control={control} />
        ))}
        <Buttons>
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </Buttons>
      </TheForm>
    </Container>
  );
};

export default Form;
