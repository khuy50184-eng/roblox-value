
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Game } from '@/lib/types';
import { GameForm } from './GameForm';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

export function GameManagement() {
  const { games } = useItemState();
  const { deleteGame } = useItemActions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | undefined>(undefined);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingGame(undefined);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (game: Game) => {
    setGameToDelete(game);
  };

  const handleConfirmDelete = () => {
    if (gameToDelete) {
      deleteGame(gameToDelete.id);
      setGameToDelete(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Game</h1>
          <p className="text-muted-foreground">Thêm, sửa hoặc xóa các game trong hệ thống của bạn.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm Game
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingGame ? 'Sửa Game' : 'Thêm Game Mới'}</DialogTitle>
            </DialogHeader>
            <GameForm setOpen={setIsDialogOpen} gameToEdit={editingGame} />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Game</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead className="text-right w-[120px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map(game => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">{game.name}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(game)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(game)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        isOpen={!!gameToDelete}
        onClose={() => setGameToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={gameToDelete?.name || ''}
      />
    </>
  );
}
