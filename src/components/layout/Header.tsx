"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calculator, Cog, Heart, MessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-600">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-500">
            Roblox Value Calculator
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <Link href="/contact">
              <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
              Liên hệ
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <Link href="/donate">
              <Heart className="mr-2 h-4 w-4 text-pink-500" />
              Ủng hộ
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <Link href="/admin">
              <Cog className="mr-2 h-4 w-4" />
              Admin Panel
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
