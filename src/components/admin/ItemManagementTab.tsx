
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { AdminItemTable } from '@/components/admin/AdminItemTable';
import { PlusCircle, Search, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ItemForm } from '@/components/admin/ItemForm';
import type { Item, Game } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface ItemManagementProps {
  game: Game;
}

export function ItemManagement({ game }: ItemManagementProps) {
  const { items } = useItemState();
  const { deleteItem } = useItemActions();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  const gameItems = useMemo(() => {
    return items.filter(item => item.gameId === game.id);
  }, [items, game.id]);

  const filteredItems = useMemo(() => {
    let filtered = [...gameItems];
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [gameItems, searchTerm]);

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(undefined);
    setIsDialogOpen(true);
  };
  
  const handleConfirmBulkDelete = () => {
    selectedIds.forEach(id => deleteItem(id));
    setSelectedIds([]);
    setIsBulkDeleteOpen(false);
  };

  const handleSelectAll = () => {
    const allIds = filteredItems.map(item => item.id);
    const areAllSelected = allIds.length > 0 && allIds.every(id => selectedIds.includes(id));
    if (areAllSelected) {
      setSelectedIds(prev => prev.filter(id => !allIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...allIds])]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách Vật phẩm</CardTitle>
           <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={() => setIsBulkDeleteOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa ({selectedIds.length})
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Thêm Vật phẩm
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Sửa Vật phẩm' : 'Thêm Vật phẩm Mới'}</DialogTitle>
                </DialogHeader>
                <ItemForm 
                    setOpen={setIsDialogOpen} 
                    itemToEdit={editingItem} 
                    preselectedGameId={game.id}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 rounded-lg bg-secondary/30 space-y-4">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                      placeholder="Tìm theo tên..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 max-w-sm"
                  />
              </div>
          </div>
          
          <AdminItemTable 
            items={filteredItems} 
            onEdit={handleEdit}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
           />
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        itemName={`(${selectedIds.length}) mục đã chọn`}
      />
    </>
  );
}
