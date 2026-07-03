
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="container mx-auto max-w-md p-4 sm:p-6 lg:p-8">
      <Card className="text-center shadow-2xl bg-secondary/60">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-lg">
            <Heart className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500">
            Ủng hộ nhà phát triển
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Quét mã QR bằng ứng dụng PayPal của bạn để ủng hộ.
            Sự đóng góp của bạn là nguồn động lực lớn lao giúp chúng tôi duy trì và phát triển dự án này!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white rounded-lg inline-block shadow-inner">
             <Image
                src="https://i.imgur.com/ScDDHCc.jpeg"
                alt="Mã QR PayPal để ủng hộ"
                width={256}
                height={256}
                className="rounded-md"
              />
          </div>
          <p className="mt-4 font-semibold text-lg">Nhat Anh Tran</p>
          <p className="text-sm text-muted-foreground">Scan to pay Nhat Anh Tran</p>
        </CardContent>
      </Card>
    </div>
  );
}
