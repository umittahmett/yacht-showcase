'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  })

  if (error) {
    console.log(error.message);
    redirect(`/auth/error?error=${error.message}`)
  }

  // revalidatePath('/', 'layout')
  redirect('/dashboard')
}
