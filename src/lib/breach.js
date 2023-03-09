async function getData() {
    const res = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/test@adobe.com?truncatedResponse=false`,
        {
            method: 'GET',
            headers: {
                'hibp-api-key': '583a2d7937de4fe7be1008e0f9507b05',
            },
        }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors  

 const data = await res.json();
  console.log('data', data);
  return {
    props: { breaches: data },
  };
};
  
  export default async function BreachesTest( { breaches }) {
    const data = await getData();
    console.log(data);

    return (
       <main>test</main>
      )
     }