import { Box, Button as TheButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import FormSection from './FormSection';

import { FieldType, Form as FormType, FormField } from '#/types/Forms';
import { useSnackbar, VariantType } from 'notistack';
import { useState } from 'react';

const Container = styled(Box)``;

const TheForm = styled.form`
  width: 100%;
`;

const Buttons = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0 3rem;
`;

const Button = styled(TheButton)`
  width: 200px;
`;

type Data = { [key: string]: unknown };

interface Props {
  className?: string;
  form: FormType;
  onSubmit: (data: Data) => Promise<string | null>;
}

const Form = ({ form, onSubmit, className }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const getDefaultValues = (useInitialValue = true) => {
    const defaultValues: { [key: string]: unknown } = {};

    const getDefaultValue = (field: FormField) => {
      if (useInitialValue && field.value !== null) return field.value;

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

  const onError = () =>
    showFeedback('Verifique os dados e tente novamente.', 'error');

  const showFeedback = (message: string, variant: VariantType) =>
    enqueueSnackbar(message, { variant });

  const submit = (data: Data) => {
    if (loading) return null;

    setLoading(true);

    onSubmit(data)
      .then((message) => {
        if (message) showFeedback(message, 'success');
      })
      .catch((message) => {
        if (message) showFeedback(message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className={className}>
      <TheForm onSubmit={handleSubmit(submit, onError)}>
        {form.sections.map((s) => (
          <FormSection key={s.label} section={s} control={control} />
        ))}
        <Buttons>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Buttons>
      </TheForm>
    </Container>
  );
};

export default Form;
