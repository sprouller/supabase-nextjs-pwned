import { createClient } from '@supabase/supabase-js';

export async function getServerSideProps() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data: user } = await supabase.auth.user();
  const param = user?.email;

  const response = await fetch(
    `https://haveibeenpwned.com/api/v3/breachedaccount/${param}?truncateResponse=true`,
    {
      method: 'GET',
      headers: {
        'hibp-api-key': 'YOUR_API_KEY_HERE',
      },
    }
  );

  const apiResult = await response.json();
  return {
    props: { breaches: apiResult },
  };
}

export default function Breach({ breaches }) {
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
            <td className="px-6 py-4 whitespace-nowrap">{breach.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
