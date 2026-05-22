'use client'

import { DataTable } from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Users, Building2, Store, List } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

type Registration = {
  id: string
  orderId: string
  email: string
  type: 'attendee' | 'sponsor' | 'exhibitor'
  status: string
  amount: number
  createdAt: string
  attendeeDetails?: {
    fullName: string
    phone: string
    organization: string
    position: string
    country: string
    ticketType: string
  }
  sponsorDetails?: {
    companyName: string
    contactPerson: string
    phone: string
    sponsorshipTier: string
    numberOfTeamMembers?: number
  }
  exhibitorDetails?: {
    companyName: string
    contactPerson: string
    phone: string
    industry: string
    boothSize: string
  }
}

function getRegistrationName(reg: Registration): string {
  if (reg.type === 'attendee') return reg.attendeeDetails?.fullName || reg.email
  if (reg.type === 'sponsor') return reg.sponsorDetails?.contactPerson || reg.sponsorDetails?.companyName || reg.email
  if (reg.type === 'exhibitor') return reg.exhibitorDetails?.contactPerson || reg.exhibitorDetails?.companyName || reg.email
  return reg.email
}

function getRegistrationCompany(reg: Registration): string {
  if (reg.type === 'attendee') return reg.attendeeDetails?.organization || '-'
  if (reg.type === 'sponsor') return reg.sponsorDetails?.companyName || '-'
  if (reg.type === 'exhibitor') return reg.exhibitorDetails?.companyName || '-'
  return '-'
}

const statusVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  approved: 'default',
  paid: 'default',
  'payment-pending': 'secondary',
  pending: 'secondary',
  rejected: 'destructive',
  cancelled: 'destructive',
}

const selectColumn = {
  id: 'select',
  header: ({ table }: any) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }: any) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value: any) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
} satisfies ColumnDef<Registration>

const statusColumn = {
  accessorFn: (row: Registration) => row.status,
  id: 'status',
  header: ({ column }: any) => (
    <DataTableColumnHeader column={column} title="Status" />
  ),
  cell: ({ row }: any) => {
    const status = row.getValue('status') as string
    return (
      <Badge variant={statusVariantMap[status] || 'outline'}>
        {status.replace(/-/g, ' ')}
      </Badge>
    )
  },
} satisfies ColumnDef<Registration>

const amountColumn = {
  accessorFn: (row: Registration) => row.amount,
  id: 'amount',
  header: ({ column }: any) => (
    <DataTableColumnHeader column={column} title="Amount" />
  ),
  cell: ({ row }: any) => {
    const amount = row.getValue('amount') as number
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0)
    return <div className="text-right font-medium">{formatted}</div>
  },
} satisfies ColumnDef<Registration>

const orderIdColumn = {
  accessorFn: (row: Registration) => row.orderId,
  id: 'orderId',
  header: ({ column }: any) => (
    <DataTableColumnHeader column={column} title="Order ID" />
  ),
  cell: ({ row }: any) => {
    const orderId = row.getValue('orderId') as string
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
        {orderId?.slice(0, 12)}...
      </code>
    )
  },
} satisfies ColumnDef<Registration>

const createdAtColumn = {
  accessorFn: (row: Registration) => new Date(row.createdAt),
  id: 'registered',
  header: ({ column }: any) => (
    <DataTableColumnHeader column={column} title="Registered" />
  ),
  cell: ({ row }: any) => {
    const date = row.getValue('registered') as Date
    return <span>{date.toLocaleDateString()}</span>
  },
} satisfies ColumnDef<Registration>

const emailColumn = {
  accessorFn: (row: Registration) => row.email,
  id: 'email',
  header: ({ column }: any) => (
    <DataTableColumnHeader column={column} title="Email" />
  ),
} satisfies ColumnDef<Registration>

function actionsColumn(tabType: string) {
  return {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }: any) => {
      const reg = row.original as Registration
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(reg.orderId)}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/${reg.orderId}`}>View details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  } satisfies ColumnDef<Registration>
}

const allColumns: ColumnDef<Registration>[] = [
  selectColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => getRegistrationName(row),
    id: 'name',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  } as ColumnDef<Registration>,
  emailColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => getRegistrationCompany(row),
    id: 'company',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Company / Organization" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.type,
    id: 'type',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }: any) => {
      const type = row.getValue('type') as string
      return <span className="capitalize">{type}</span>
    },
  } as ColumnDef<Registration>,
  statusColumn as ColumnDef<Registration>,
  amountColumn as ColumnDef<Registration>,
  orderIdColumn as ColumnDef<Registration>,
  createdAtColumn as ColumnDef<Registration>,
  actionsColumn('all') as ColumnDef<Registration>,
]

const attendeeColumns: ColumnDef<Registration>[] = [
  selectColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.attendeeDetails?.fullName || row.email,
    id: 'fullName',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  } as ColumnDef<Registration>,
  emailColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.attendeeDetails?.organization || '-',
    id: 'organization',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.attendeeDetails?.position || '-',
    id: 'position',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.attendeeDetails?.country || '-',
    id: 'country',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.attendeeDetails?.ticketType || '-',
    id: 'ticketType',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Ticket" />
    ),
    cell: ({ row }: any) => {
      const ticket = row.getValue('ticketType') as string
      return <span className="capitalize">{ticket.replace(/-/g, ' ')}</span>
    },
  } as ColumnDef<Registration>,
  statusColumn as ColumnDef<Registration>,
  amountColumn as ColumnDef<Registration>,
  orderIdColumn as ColumnDef<Registration>,
  createdAtColumn as ColumnDef<Registration>,
  actionsColumn('attendee') as ColumnDef<Registration>,
]

const sponsorColumns: ColumnDef<Registration>[] = [
  selectColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.sponsorDetails?.companyName || '-',
    id: 'companyName',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.sponsorDetails?.contactPerson || '-',
    id: 'contactPerson',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Contact Person" />
    ),
  } as ColumnDef<Registration>,
  emailColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.sponsorDetails?.sponsorshipTier || '-',
    id: 'sponsorshipTier',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Tier" />
    ),
    cell: ({ row }: any) => {
      const tier = row.getValue('sponsorshipTier') as string
      return <span className="capitalize">{tier}</span>
    },
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.sponsorDetails?.numberOfTeamMembers || '-',
    id: 'teamMembers',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Team Size" />
    ),
    cell: ({ row }: any) => {
      const val = row.getValue('teamMembers')
      return <span>{val?.toString() || '-'}</span>
    },
  } as ColumnDef<Registration>,
  statusColumn as ColumnDef<Registration>,
  amountColumn as ColumnDef<Registration>,
  orderIdColumn as ColumnDef<Registration>,
  createdAtColumn as ColumnDef<Registration>,
  actionsColumn('sponsor') as ColumnDef<Registration>,
]

const exhibitorColumns: ColumnDef<Registration>[] = [
  selectColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.exhibitorDetails?.companyName || '-',
    id: 'companyName',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.exhibitorDetails?.contactPerson || '-',
    id: 'contactPerson',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Contact Person" />
    ),
  } as ColumnDef<Registration>,
  emailColumn as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.exhibitorDetails?.industry || '-',
    id: 'industry',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Industry" />
    ),
  } as ColumnDef<Registration>,
  {
    accessorFn: (row) => row.exhibitorDetails?.boothSize || '-',
    id: 'boothSize',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Booth Size" />
    ),
    cell: ({ row }: any) => {
      const size = row.getValue('boothSize') as string
      return <span className="capitalize">{size}</span>
    },
  } as ColumnDef<Registration>,
  statusColumn as ColumnDef<Registration>,
  amountColumn as ColumnDef<Registration>,
  orderIdColumn as ColumnDef<Registration>,
  createdAtColumn as ColumnDef<Registration>,
  actionsColumn('exhibitor') as ColumnDef<Registration>,
]

type TabValue = 'all' | 'attendee' | 'sponsor' | 'exhibitor'

const tabColumns: Record<TabValue, ColumnDef<Registration>[]> = {
  all: allColumns,
  attendee: attendeeColumns,
  sponsor: sponsorColumns,
  exhibitor: exhibitorColumns,
}

function filterByType(data: Registration[], tab: TabValue): Registration[] {
  if (tab === 'all') return data
  return data.filter((r) => r.type === tab)
}

const tabs: { value: TabValue; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: List },
  { value: 'attendee', label: 'Attendees', icon: Users },
  { value: 'sponsor', label: 'Sponsors', icon: Building2 },
  { value: 'exhibitor', label: 'Exhibitors', icon: Store },
]

export default function RegisteredPage() {
  const [data, setData] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabValue>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/registrations?limit=100')
        const json = await res.json()
        if (json.success) {
          setData(json.docs)
        }
      } catch (err) {
        console.error('Failed to fetch registrations:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = filterByType(data, activeTab)

  return (
    <div className="min-h-screen">
      <section className="relative px-4 pb-10 pt-32 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Registered Members</h1>
            <p className="text-muted-foreground mt-1">
              View all registered attendees, sponsors, and exhibitors.
            </p>
          </div>

          <div className="event-surface rounded-[2rem] p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
              <TabsList className="mb-6">
                {tabs.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger key={value} value={value} className="gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map(({ value }) => (
                <TabsContent key={value} value={value}>
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
                    </div>
                  ) : (
                    <DataTable
                      columns={tabColumns[value]}
                      data={filterByType(data, value)}
                      filterColumn={value === 'all' ? 'name' : value === 'attendee' ? 'fullName' : 'companyName'}
                      filterPlaceholder={`Filter ${value === 'all' ? 'by name' : value === 'attendee' ? 'attendees...' : value === 'sponsor' ? 'sponsors...' : 'exhibitors...'}`}
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
