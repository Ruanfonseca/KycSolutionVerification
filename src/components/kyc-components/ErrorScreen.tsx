import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Frown, XCircle } from "lucide-react"

type ErrorProps = {
  message: string
  title: string
  errorType: string // ex: 'face', 'network', 'generic'
  open: boolean
  onClose: () => void
}

const getIconByType = (type: string) => {
  switch (type) {
    case "face":
      return <Frown className="h-10 w-10 text-blue-600" />
    case "network":
      return <XCircle className="h-10 w-10 text-blue-600" />
    default:
      return <AlertTriangle className="h-10 w-10 text-blue-600" />
  }
}

export default function ErrorDialog({ message, title, errorType, open, onClose }: ErrorProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <DialogHeader className="items-center space-y-2">
          {getIconByType(errorType)}
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {message}
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={onClose}
        >
          Voltar 
        </Button>
      </DialogContent>
    </Dialog>
  )
}
