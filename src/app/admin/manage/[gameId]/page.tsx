
"use client";

import React from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { useItemState } from '@/context/ItemContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemManagement } from '@/components/admin/ItemManagementTab';
import { CategoryManagement } from '@/components/admin/CategoryManagementTab';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ManageGamePage() {
    const params = useParams();
    const router = useRouter();
    const gameId = params.gameId as string;

    const { games, isDataLoaded } = useItemState();

    const currentGame = React.useMemo(() => {
        if (!isDataLoaded) return null;
        return games.find(g => g.id === gameId);
    }, [games, gameId, isDataLoaded]);

    if (!isDataLoaded) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-8 w-64" />
                <div className="pt-4">
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-[400px] w-full" />
                </div>
            </div>
        )
    }

    if (!currentGame) {
        notFound();
        return null;
    }

    return (
        <div className="space-y-4">
            <div>
                 <Button variant="outline" size="sm" className="mb-4" onClick={() => router.push('/admin/dashboard')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại Dashboard
                </Button>
                <h1 className="text-3xl font-bold">Quản lý: {currentGame.name}</h1>
                <p className="text-muted-foreground">Chỉnh sửa vật phẩm và category cho game này.</p>
            </div>
            <Tabs defaultValue="items">
                <TabsList>
                    <TabsTrigger value="items">Vật phẩm</TabsTrigger>
                    <TabsTrigger value="categories">Category</TabsTrigger>
                </TabsList>
                <TabsContent value="items">
                    <ItemManagement game={currentGame} />
                </TabsContent>
                <TabsContent value="categories">
                    <CategoryManagement game={currentGame} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
