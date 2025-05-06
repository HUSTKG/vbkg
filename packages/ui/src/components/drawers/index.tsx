"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

interface CustomDrawerProps {
  title?: string
  children?: React.ReactNode
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showFooter?: boolean;
  contentClassName?: string;
}

export function CustomDrawer({
  title = "Title",
  description = "Description",
  children,
  open,
  showFooter = true,
  contentClassName,
  onOpenChange,
}: CustomDrawerProps) {
  return (
    <Drawer
		open={open}
		onOpenChange={onOpenChange}
	>
      <DrawerContent className={cn(contentClassName)}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
		  <DrawerContent>
		  	{children}
		  </DrawerContent>
		  {showFooter && (
			<DrawerFooter>
			  <Button>Submit</Button>
			  <DrawerClose asChild>
				<Button variant="outline">Cancel</Button>
			  </DrawerClose>
			</DrawerFooter>
		  )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

