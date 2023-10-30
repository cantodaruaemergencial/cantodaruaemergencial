import Layout from '#/components/Layout';
import CreatePersonPage from '#/components/Pages/PeoplePage/CreatePersonPage';
import { useAuthState } from '#/packages/auth/auth-context';
import PeopleService from '#/services/PeopleService';
import { Form } from '#/types/Forms';
import { PersonCompleteData } from '#/types/People';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NewPerson = () => {
  const [form, setForm] = useState<Form | null>(null);

  const [personCompleteData, setPersonCompleteData] =
    useState<PersonCompleteData | null>();

  const router = useRouter();

  const { userProfile } = useAuthState();

  useEffect(() => {
    const { pessoaId } = router.query;

    const id = pessoaId ? +pessoaId[0] : null;

    PeopleService.getPersonForm(id, userProfile).then((formData) => {
      setForm({ sections: formData.sections });
      setPersonCompleteData(formData.personCompleteData);
    });
  }, []);

  return (
    <Layout title="Cadastro - Canto da Rua">
      <CreatePersonPage
        form={form}
        personInformation={personCompleteData}
        userId={userProfile?.id ?? 0}
      />
    </Layout>
  );
};

export default NewPerson;
