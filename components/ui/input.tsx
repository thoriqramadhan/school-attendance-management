'use client'
import * as React from "react"
import { Eye, EyeClosed } from 'lucide-react'


import { cn } from "@/lib/utils"


function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPasswordType = type == 'password'
  const resolvedType = isPasswordType ? showPassword ? 'text' : 'password' : type
  return (
    <div className="relative">
      <input
        type={resolvedType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {isPasswordType &&
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-xs text-muted-foreground"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <Eye size={15} /> : <EyeClosed size={15} />}
        </div>
      }
    </div>
  )
}

export { Input }
