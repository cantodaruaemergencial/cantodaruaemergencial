import Layout from '#/components/Layout';
import PersonPage from '#/components/Pages/PersonPage';
import PeopleService from '#/services/PeopleService';
import { Form } from '#/types/Forms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NewPerson = () => {
  const [form, setForm] = useState<Form | null>(null);

  const [personId, setPersonId] = useState<number | null>();

  const router = useRouter();

  useEffect(() => {
    const { pessoaId } = router.query;

    const id = pessoaId ? +pessoaId[0] : null;

    PeopleService.getPersonForm(id).then((formData) => {
      setForm(formData);
      setPersonId(id);
    });
  }, []);

  return (
    <Layout title="Cadastro - Canto da Rua">
      <PersonPage
        form={form}
        personId={personId}
      />
    </Layout>
  );
};

export default NewPerson;
