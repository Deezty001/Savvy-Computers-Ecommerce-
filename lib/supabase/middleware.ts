import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const isAccountPage = request.nextUrl.pathname.startsWith('/account')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  // SPEED OPTIMIZATION: If not an admin or account page, bypass session check entirely
  if (!isAccountPage && !isAdminPage) {
    return response
  }

  // Use getSession for much faster local validation instead of getUser's network round-trip
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  // Redirect to login if accessing protected page without session
  if (!user && (isAccountPage || isAdminPage)) {
    if (request.nextUrl.pathname !== '/account/login' && request.nextUrl.pathname !== '/account/register') {
      return NextResponse.redirect(new URL('/account/login', request.url))
    }
  }

  if (user) {

    const isAccountPage = request.nextUrl.pathname.startsWith('/account')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

    if (isAccountPage || isAdminPage) {
      // Optimization: Check email override first to avoid ANY database calls
      let isAdmin = user.email === 'adamjameskarim@gmail.com'
      
      if (!isAdmin) {
        // Only initialize adminSupabase if we actually need it
        const { createClient } = await import('@supabase/supabase-js')
        const adminSupabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { autoRefreshToken: false, persistSession: false } }
        )

        const { data: profile } = await adminSupabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        
        isAdmin = !!profile?.is_admin
      }

      // Redirection logic
      if (isAdmin && request.nextUrl.pathname === '/account') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }

      if (isAdminPage && !isAdmin) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  return response
}
