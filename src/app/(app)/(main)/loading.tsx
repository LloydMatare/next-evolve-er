import { Spinner } from '@/components/ui/spinner'

function MainLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="size-10 text-[var(--brand-cyan)]" />
    </div>
  )
}

export default MainLoading
