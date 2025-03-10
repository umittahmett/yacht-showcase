'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function logout() {
  const supabase = await createClient()
  if (!supabase.auth.getSession()) {
    await supabase.auth.signOut()
    redirect('/')
  }
}
