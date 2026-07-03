
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, MessageSquare } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-lg p-4 sm:p-6 lg:p-8">
      <Card className="shadow-2xl bg-secondary/60">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg">
            <MessageSquare className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Liên hệ để mua tài khoản
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Nếu bạn có nhu cầu mua tài khoản Roblox, vui lòng liên hệ với chúng tôi qua Instagram.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-center p-6 bg-secondary/80 rounded-lg flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white mb-4">
                <InstagramIcon/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instagram</h3>
            <p className="text-muted-foreground mb-4">@sanotriu</p>
            <Button asChild className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
              <Link href="https://www.instagram.com/sanotriu/" target="_blank">
                <Instagram className="mr-2 h-4 w-4" />
                Nhắn tin ngay
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
