import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

interface User {
  name: string
  email: string
  date: string
  avatarColor: string
  initials: string
}

const users: User[] = [
  {
    name: "Hiya Sarkar",
    email: "sarkarhiya53@gmail.com",
    date: "Feb 20",
    avatarColor: "bg-[#f6e1a4]",
    initials: "HS",
  },
  {
    name: "Sree Gopal Saha",
    email: "sreegopal0101@gmail.com",
    date: "Feb 18",
    avatarColor: "bg-[#f6d6a4]",
    initials: "SS",
  },
  // Add more users as needed
]

export default function UserApprovalList() {
  return (
    <div className="min-h-screen bg-[#fff] text-zinc-900">
      <div className="mx-auto max-w-4xl space-y-1">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-sm p-3 transition-colors hover:bg-zinc-100"
          >
            <div className="flex items-center gap-3">
              <Avatar className={`h-8 w-8 ${user.avatarColor}`}>
                <AvatarFallback className="text-zinc-900">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-zinc-500">{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700 hover:bg-green-500/10">
                <Check className="h-4 w-4 mr-1.5" />
                Approve
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-500/10">
                <X className="h-4 w-4 mr-1.5" />
                Decline
              </Button>
              <span className="ml-4 hidden text-sm text-zinc-500 sm:inline">{user.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

