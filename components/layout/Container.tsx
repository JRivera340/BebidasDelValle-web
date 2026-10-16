import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'nav' | 'header' | 'footer'
}

export function Container({ as: Tag = 'div', className, ...props }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-contenedor px-4 sm:px-6 lg:px-8', className)} {...props} />
}
