import createClient from 'src/lib/supabase-server';

export const getStaticProps = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const param = `${user?.email}`;
  const res = await fetch(
    `https://haveibeenpwned.com/api/v3/breachedaccount/${param}?truncatedResponse=false`,
    {
      method: 'GET',
      headers: {
        'hibp-api-key': '583a2d7937de4fe7be1008e0f9507b05',
      },
    }
  );
  const data = await res.json();
  console.log('data', data);
  return {
    props: { breaches: data },
  };
};

const Breaches = ({ breaches }) => {
  console.log(breaches);
  return (
    <div>
      <h1>All breaches</h1>
      {breaches?.map((breach) => (
        <div key={breach.Name}>
          <h3>{breach.Name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Breaches;
