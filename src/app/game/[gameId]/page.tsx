
"use client";

import React, { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemCard } from '@/components/ItemCard';
import { ItemProvider, useItemState, useItemActions } from '@/context/ItemContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Package, ArrowLeft } from 'lucide-react';
import { ValueCalculator } from '@/components/ValueCalculator';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};


function CalculatorPage() {
  const params = useParams();
  const gameId = params.gameId as string;

  const { 
    items, 
    selectedItems, 
    rarities, 
    games, 
    categories,
    searchTerm,
    rarityFilter,
    categoryFilter,
    isDataLoaded,
    usdRate,
  } = useItemState();
  
  const { 
    toggleSelectedItem,
    setSearchTerm,
    setGameFilter,
    setRarityFilter,
    setCategoryFilter,
    clearSelection
  } = useItemActions();
  
  const currentGame = useMemo(() => {
    if (!isDataLoaded) return null;
    const game = games.find(g => g.id === gameId);
    return game;
  }, [games, gameId, isDataLoaded]);
  
  // Effect to set the game filter and clear selection when the page loads
  useEffect(() => {
    setGameFilter(gameId);
    // Clear selection from other games
    clearSelection();
  }, [gameId, setGameFilter, clearSelection]);
  
  const filteredCategories = useMemo(() => {
    return categories.filter(c => c.gameId === gameId);
  }, [categories, gameId]);

  const filteredRarities = useMemo(() => {
    // Show rarities for the current game AND global rarities
    return rarities.filter(r => r.gameId === gameId || !r.gameId);
  }, [rarities, gameId]);


  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => item.gameId === gameId);
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.categoryId === categoryFilter);
    }

    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (rarityFilter !== 'all') {
      filtered = filtered.filter(item => item.rarity === rarityFilter);
    }
    
    // The sorting should be based on the calculated VND value
    return filtered.sort((a, b) => {
        const valueA = Math.round((a.value ?? 0) * usdRate);
        const valueB = Math.round((b.value ?? 0) * usdRate);
        return valueB - valueA;
    });
  }, [items, searchTerm, gameId, rarityFilter, categoryFilter, usdRate]);
  

  const isSelected = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };
  
  if (!isDataLoaded) {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-xl" />)}
                    </div>
                </div>
                <div className="lg:col-span-1">
                     <Skeleton className="h-[500px] w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (!currentGame) {
    notFound();
    return null;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
            <Button asChild variant="outline" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại chọn Game
                </Link>
            </Button>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                {currentGame.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Chọn các vật phẩm để bắt đầu tính toán giá trị của chúng.
            </p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="my-8 space-y-4 rounded-lg bg-secondary/30 p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="relative sm:col-span-3 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search items..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-10 border-muted-foreground/50 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={gameId === 'all'}>
                            <SelectTrigger className="border-muted-foreground/50 focus:border-primary/50 focus:ring-primary/50">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {filteredCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={rarityFilter} onValueChange={setRarityFilter} disabled={gameId === 'all'}>
                            <SelectTrigger className="border-muted-foreground/50 focus:border-primary/50 focus:ring-primary/50">
                                <SelectValue placeholder="All Rarities" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Rarities</SelectItem>
                                {filteredRarities.map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                    
                <motion.div 
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                    key={categoryFilter + rarityFilter} // Re-trigger animation on filter change
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {filteredAndSortedItems.length > 0 ? (
                        filteredAndSortedItems.map(item => (
                             <motion.div key={item.id} variants={itemVariants}>
                                <ItemCard
                                    item={item}
                                    isSelected={isSelected(item.id)}
                                    onSelectToggle={() => toggleSelectedItem(item)}
                                />
                             </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full mt-10 flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-secondary/30">
                            <Package className="h-16 w-16 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium text-muted-foreground">Không tìm thấy vật phẩm nào</p>
                            <p className="text-sm text-muted-foreground">Hãy thử thay đổi bộ lọc hoặc tìm kiếm nhé.</p>
                        </div>
                    )}
                </motion.div>
            </div>
            <div className="lg:col-span-1">
                <div className="sticky top-20">
                    <ValueCalculator />
                </div>
            </div>
        </div>
    </div>
  );
}


export default function GamePage() {
  return (
    <ItemProvider>
      <CalculatorPage />
    </ItemProvider>
  )
}
