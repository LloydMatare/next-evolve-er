import { Spinner } from '@/components/ui/spinner'

function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-10 text-[var(--brand-cyan)]" />
    </div>
  )
}

export default AuthLoading
