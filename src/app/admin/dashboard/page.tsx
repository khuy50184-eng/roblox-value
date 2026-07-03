
"use client";

import React from 'react';
import Link from 'next/link';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, PlusCircle, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GameForm } from '@/components/admin/GameForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Game } from '@/lib/types';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { Input } from '@/components/ui/input';

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

export default function AdminDashboardPage() {
  const { games, isDataLoaded } = useItemState();
  const { deleteGame } = useItemActions();
  
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [gameToEdit, setGameToEdit] = React.useState<Game | undefined>(undefined);
  const [gameToDelete, setGameToDelete] = React.useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAddNew = () => {
    setGameToEdit(undefined);
    setIsFormOpen(true);
  }

  const handleEdit = (game: Game) => {
    setGameToEdit(game);
    setIsFormOpen(true);
  }

  const handleDelete = (game: Game) => {
    setGameToDelete(game);
  }

  const confirmDelete = () => {
    if(gameToDelete) {
      deleteGame(gameToDelete.id);
      setGameToDelete(null);
    }
  }

  const filteredGames = React.useMemo(() => {
    if (!searchTerm) return games;
    return games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [games, searchTerm]);


  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Chọn một game để bắt đầu quản lý hoặc thêm game mới.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Thêm Game Mới
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{gameToEdit ? "Sửa Game" : "Thêm Game Mới"}</DialogTitle>
              </DialogHeader>
              <GameForm setOpen={setIsFormOpen} gameToEdit={gameToEdit} />
            </DialogContent>
        </Dialog>
      </div>

       <div className="my-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-sm"
          />
        </div>
      </div>
      
      <motion.div 
        className="grid flex-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {!isDataLoaded ? (
          Array.from({ length: 4 }).map((_, i) => (
             <motion.div key={i} variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-32 mt-2" />
                         <div className="flex justify-end gap-2 mt-4">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          ))
        ) : (
          filteredGames.map(game => (
            <motion.div key={game.id} variants={itemVariants} className="group relative">
                <Card className="transition-all h-full flex flex-col">
                  <Link href={`/admin/manage/${game.id}`} className="flex-grow">
                    <CardHeader>
                      <CardTitle>{game.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Vào quản lý chi tiết</p>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-2 pt-0 border-t mt-4 flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(game)}>
                          <Edit className="h-4 w-4"/>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(game)}>
                          <Trash2 className="h-4 w-4"/>
                      </Button>
                  </CardFooter>
                </Card>
            </motion.div>
          ))
        )}
      </motion.div>
      <DeleteConfirmationDialog 
        isOpen={!!gameToDelete}
        onClose={() => setGameToDelete(null)}
        onConfirm={confirmDelete}
        itemName={gameToDelete?.name || ''}
      />
    </>
  );
}
