'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC}auth/sign-in`,
    },
  })


  if (error) {
    console.log(error.message);
    redirect(`/auth/sign-up?error=${error.message}`)
  }else if (data.user?.identities?.length === 0) {
    console.log("User not created");
    redirect(`/auth/sign-up?error=User with this email already exists`)
  }


  // revalidatePath('/', 'layout')
  redirect('/auth/check-email')
}