import Link from 'next/link';
import { redirect } from 'next/navigation';
import Auth from 'src/components/Auth';

import SignOut from 'src/components/SignOut';
import createClient from 'src/lib/supabase-server';
import Breach from 'src/lib/breach';


export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='bg-white py-16 sm:py-24 lg:py-32'>
      <h2>User Profile</h2>
      <code className='text-1xl mb-5 font-bold'>{user?.email}</code>
      <div className="heading">Your Current Breaches:</div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Domain</th>
            <th className="px-4 py-2">Breach Date</th>
          </tr>
        </thead>
        <tbody>
          <Breach />
          <SignOut />
        </tbody>
      </table>
    </div>
  );
}
