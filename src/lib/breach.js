import createClient from 'src/lib/supabase-server';

async function getData() {

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    const param = `${user?.email}`;

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
};
  
  export default async function Breach({breaches}) {
    const dataHere = await getData();
    let apiResult = dataHere.props.breaches;
  
    return (
      <div>
        { apiResult.map((breach) => (
          <div key={breach.Name}>
            <p>{breach.Name}</p>
          </div>
        ))}
      </div>
    );
     }