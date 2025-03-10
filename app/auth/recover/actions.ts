'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function recover(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC}auth/reset-password`,
  })

  if (error) {
    console.log(error.message);
    redirect(`/auth/recover?error=${error.message}`)
  }

  // revalidatePath('/', 'layout')
  redirect('/auth/check-email')
}
