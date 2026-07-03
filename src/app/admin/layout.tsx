
"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LoginPage from '@/components/admin/LoginPage';
import { ItemProvider } from '@/context/ItemContext';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Settings, Gem, LayoutDashboard, LogOut, Package, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function UserMenu() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openMenu = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpen(false), 150);
    };

    const initials = user?.name?.trim()?.charAt(0)?.toUpperCase() ?? 'U';

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden font-medium sm:inline-block">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
            >
                <DropdownMenuLabel className="flex flex-col gap-0.5">
                    <span>{user?.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={logout}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/rarities', icon: Gem, label: 'Quản lý Độ hiếm' },
        { href: '/admin/settings', icon: Settings, label: 'Cài đặt' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                 <Link href="/admin/dashboard" className="mr-6 flex items-center space-x-2">
                    <Package className="h-6 w-6" />
                    <span className="font-bold sm:inline-block">Admin Panel</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                     {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'transition-colors hover:text-foreground/80',
                                pathname.startsWith(item.href) ? 'text-foreground' : 'text-foreground/60'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end">
                     <UserMenu />
                </div>
            </div>
        </header>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-10 w-1/3" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mb-2" />
        <div className="border rounded-lg p-4">
          <Skeleton className="h-10 w-full mb-4" />
           <Skeleton className="h-8 w-full mb-2" />
           <Skeleton className="h-8 w-full mb-2" />
           <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  return (
    <ItemProvider>
        <div className="min-h-screen w-full flex flex-col">
            <AdminNav />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    </ItemProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
