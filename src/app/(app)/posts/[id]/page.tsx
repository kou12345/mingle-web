import { Comments } from '@/components/Comments';
import { MusicPlayerSection } from '@/components/MusicPlayerSection';
import { Search } from '@/components/ui/Search';
import Loader from '@/components/ui/Loader';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Session } from 'inspector';

type Data = {
  session: Session | null;
};

export default async function Page({ params }: { params: { id: string } }) {
  const data = (await getSession()) as Data;
  const { id } = params;

  return (
    <div className="mx-auto w-11/12">
      <div className="my-6 ml-auto w-fit">
        <Search />
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <MusicPlayerSection postId={id} data={data} />
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}

const getSession = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase.auth.getSession();
    return data;
  } catch (error) {
    console.log(error)
  }
};
