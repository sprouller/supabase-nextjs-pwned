import createClient from 'src/lib/supabase-server';

async function getData() {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const param = `${user?.email}`;
}

export async function getServerSideProps(context) {
  const param = context.params.id;
  const response = await fetch(
    `https://haveibeenpwned.com/api/v3/breachedaccount/${param}?truncatedResponse=true`,
    {
      method: 'GET',
      headers: {
        'hibp-api-key': '583a2d7937de4fe7be1008e0f9507b05',
      },
    }
  );

  const apiResult = await response.json();

  return {
    props: { breaches: apiResult },
  };
}

const Breach = ({ breaches }) => {
  if (!breaches) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Breach</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        {breaches.map((breach) => (
          <tr key={breach.Name}>
            <td className="px-6 py-4 whitespace-nowrap">{breach.Name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{breach.Title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Breach;