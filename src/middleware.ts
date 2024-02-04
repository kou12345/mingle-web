import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import 'server-only';
import { createClient } from './utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  console.log('middleware');
  const res = NextResponse.next();
  const supabase = createClient(req);

  // ユーザーのsessionを更新
  const { data, error } = await supabase.supabase.auth.getSession();

  if (error) {
    console.log(error.message);
  }

  // すでにloginしている場合に、/loginにアクセスした場合、/にリダイレクトする
  if (data.session && req.nextUrl.pathname === '/login') {
    console.log('loginしているので、/にリダイレクト');
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname === '/login') {
    console.log('login画面なので、何もしない');
    return res;
  }

  // if (!data.session) {
  //   console.log('loginしていないので、login画面にリダイレクト');
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // ログインしていないユーザーは/onboardingにアクセスできないようにする
  if (!data.session && req.nextUrl.pathname === '/onboarding') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ログインしていないユーザーは/postにアクセスできないようにする
  if (!data.session && req.nextUrl.pathname === '/post') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ---オンボーディングの処理---

  const {
    data: { user },
  } = await supabase.supabase.auth.getUser();

  console.log('onboardingStart: ', user?.user_metadata.onboardingStart);

  // onboardingStartがtrueならonboardingの処理を開始する
  if (user?.user_metadata.onboardingStart) {
    if (
      (!user?.user_metadata.hasUserName || !user?.user_metadata.hasProfile) &&
      req.nextUrl.pathname === '/onboarding'
    ) {
      console.log('onboarding画面なので、何もしない');
      return res;
    }

    // hasUserNameがfalseなら、/onboardingにリダイレクト
    if (!user?.user_metadata.hasUserName) {
      console.log(
        'ユーザー名が登録されていないので、ユーザー名登録画面にリダイレクト',
      );
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    // hasProfileがfalseなら、/onboardingにリダイレクト
    if (!user?.user_metadata.hasProfile) {
      console.log(
        'プロフィールが登録されていないので、プロフィール登録画面にリダイレクト',
      );
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    // hasUserNameとhasProfileがtrue and /onboarding/にリダイレクト
    if (
      user?.user_metadata.hasUserName &&
      user?.user_metadata.hasProfile &&
      req.nextUrl.pathname === '/onboarding'
    ) {
      console.log(
        'ユーザー名とプロフィールが登録されているので、/にリダイレクト',
      );
      return NextResponse.redirect(new URL('/', req.url));
    }

    // ---オンボーディングの処理はここまで---
  }
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
