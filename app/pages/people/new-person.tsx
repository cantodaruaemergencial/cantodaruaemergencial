import Layout from '#/components/Layout';
import PersonPage from '#/components/Pages/PersonPage';
import PeopleService from '#/services/PeopleService';
import { Form } from '#/types/Forms';

interface Props {
  form: Form;
}

const NewPerson = ({ form }: Props): React.ReactElement => (
  <Layout title="Cadastro - Canto da Rua">
    <PersonPage form={form} />
  </Layout>
);

export const getStaticProps = async () => {
  const form = await PeopleService.getPersonForm();

  return {
    props: {
      form,
    },
    revalidate: 60,
  };
};

export default NewPerson;
