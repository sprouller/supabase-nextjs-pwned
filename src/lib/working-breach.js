async function getData() {
    const res = await fetch(
        `https://api.api-ninjas.com/v1/city?name=Bristol`,
        {
            method: 'GET',
            headers: {
                'X-Api-Key': '+BXaakNPdsGnS4hLN20CFw==usbGSSHo3dbFY7qZ',
            },
        }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors  
    return res.json();
  }
  
  export default async function BreachesTest() {
    const data = await getData();
    console.log(data);
    return <main></main>;
  }
  