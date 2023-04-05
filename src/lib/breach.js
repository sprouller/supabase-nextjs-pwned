import createClient from 'src/lib/supabase-server';

async function getData() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //const param = `${user?.email}`;
  const param = 'test@nike.com';

  const response = await fetch(
    `https://haveibeenpwned.com/api/v3/breachedaccount/${param}?truncateResponse=false`,
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
};

export default async function Breach({breaches}) {
  const dataHere = await getData();
  const apiResult = dataHere.props.breaches;

  return (
    <>
      {apiResult.map((breach) => (
        <tr key={breach.Name}>
          <td className="px-4 py-4 whitespace-nowrap">{breach.Name}</td>
          <td className="px-4 py-4 whitespace-nowrap">{breach.Domain || 'No domain available'}</td>
          <td className="px-4 py-4 whitespace-nowrap">{breach.BreachDate || 'No date available'}</td>
        </tr>
      ))}
      </>
  );
} 
