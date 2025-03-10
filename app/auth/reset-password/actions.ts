'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    new_password: formData.get('new_password') as string,
  }

  const { error } = await supabase.auth.updateUser({
    password: data.new_password,
  })

  if (error) {
    console.log(error.message);
    redirect(`/auth/error?error=${error.message}`)
  }

  // revalidatePath('/', 'layout')
  redirect('/dashboard')
}
