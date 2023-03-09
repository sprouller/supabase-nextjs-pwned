import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';
import createClient from 'src/lib/supabase-server';
import Breaches from 'src/app/pulltest/breach.tsx';

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const userData = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()
    .then((response) => {
      const testUsername = response.data;
      return testUsername;
    });

  return (
    <div className="card">
      <h2>User Profile</h2>
      <code className="highlight">{user.email}</code>
      <code className="highlight">{userData.username}</code>
      <code className="highlight"><Breaches/></code>
      <div className="heading">Last Signed In:</div>
      <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>
      <Link className="button" href="/">
        Go Home
      </Link>
      <SignOut />
    </div>
  );
}
