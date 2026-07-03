
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ItemProvider, useItemState } from '@/context/ItemContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};


function HomePageContent() {
  const { games, isDataLoaded } = useItemState();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          Roblox Value Calculator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Calculate the total value of your Roblox items! Select a game to start.
        </p>
         <Alert className="mt-6 max-w-2xl mx-auto text-left border-cyan-500/50 bg-secondary/30">
          <Info className="h-4 w-4 text-cyan-400" />
          <AlertTitle>Lưu ý về giá trị</AlertTitle>
          <AlertDescription>
            Vì giá trị vật phẩm biến động, các ước tính có thể không hoàn toàn chính xác. Nếu bạn cần thay đổi giá trị, vui lòng <Link href="/contact" className="font-semibold text-cyan-400 hover:underline">liên hệ</Link>. Web sẽ cố gắng cập nhật hàng tuần, nếu có ủng hộ sẽ được cập nhật hàng ngày.
          </AlertDescription>
        </Alert>
      </div>

       <div className="mx-auto max-w-4xl mb-12">
        <div className="rounded-xl border border-green-500/50 bg-secondary/50 p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <Gift className="h-8 w-8 text-green-400" />
            <div>
              <h2 className="text-lg font-semibold">Túi Mù Miễn Phí</h2>
              <p className="text-sm text-muted-foreground">Nhận một tài khoản Roblox ngẫu nhiên!</p>
            </div>
          </div>
          <Button asChild className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity">
            <Link href="https://forms.gle/iPYktfvCAfb2jJsc9" target="_blank">
              Nhận ngay
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Chọn một Game</h2>
        <p className="text-muted-foreground">Bắt đầu bằng cách chọn game bạn muốn tính toán giá trị.</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        >
        {!isDataLoaded ? (
          Array.from({ length: 2 }).map((_, i) => (
             <motion.div key={i} variants={itemVariants}>
                <Card className="bg-secondary/40 border-muted-foreground/30">
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <Skeleton className="aspect-video w-full rounded-lg mb-4" />
                        <Skeleton className="h-10 w-32" />
                    </CardContent>
                </Card>
            </motion.div>
          ))
        ) : (
          games.map(game => (
            <motion.div key={game.id} variants={itemVariants}>
                <Link href={`/game/${game.id}`} className="group block rounded-lg">
                    <Card className="relative bg-secondary/40 border border-muted-foreground/30 h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-purple-500/20 group-hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 rounded-lg transition-all duration-300"></div>
                        
                        <CardContent className="p-0">
                           <div className="relative w-full bg-secondary">
                                {game.imageUrl && (
                                    <Image 
                                        src={game.imageUrl} 
                                        alt={game.name} 
                                        width={600}
                                        height={338}
                                        className="object-cover w-full h-auto transition-all duration-300 group-hover:scale-110"
                                    />
                                )}
                           </div>
                        </CardContent>
                        <CardHeader className="text-center relative z-10 p-6">
                            <CardTitle className="text-2xl">{game.name}</CardTitle>
                             <div className="mt-4">
                                <Button variant="outline" className="bg-secondary/80 border-muted-foreground/50 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg">
                                    Bắt đầu tính toán
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                             </div>
                        </CardHeader>
                    </Card>
                </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <ItemProvider>
      <HomePageContent />
    </ItemProvider>
  )
}
