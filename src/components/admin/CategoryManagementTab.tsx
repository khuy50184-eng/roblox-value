
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Category, Game } from '@/lib/types';
import { CategoryForm } from './CategoryForm';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { Input } from '../ui/input';

interface CategoryManagementProps {
  game: Game;
}

export function CategoryManagement({ game }: CategoryManagementProps) {
  const { categories } = useItemState();
  const { deleteCategory } = useItemActions(); 

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const gameCategories = useMemo(() => {
    return categories.filter(c => c.gameId === game.id);
  }, [categories, game.id]);
  
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return gameCategories;
    return gameCategories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [gameCategories, searchTerm]);


  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingCategory(undefined);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };
  
  const handleConfirmBulkDelete = () => {
    selectedIds.forEach(id => deleteCategory(id));
    setSelectedIds([]);
    setIsBulkDeleteOpen(false);
  };

  const handleSelectAll = () => {
    const allIds = filteredCategories.map(c => c.id);
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
          <CardTitle>Danh sách Category</CardTitle>
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
                  Thêm Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Sửa Category' : 'Thêm Category Mới'}</DialogTitle>
                </DialogHeader>
                <CategoryForm 
                  setOpen={setIsDialogOpen} 
                  categoryToEdit={editingCategory} 
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
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox
                            checked={filteredCategories.length > 0 && filteredCategories.every(c => selectedIds.includes(c.id))}
                            onCheckedChange={handleSelectAll}
                            disabled={filteredCategories.length === 0}
                        />
                    </TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead className="text-right w-[120px]">Hành động</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredCategories.map(category => (
                    <TableRow key={category.id}>
                    <TableCell>
                         <Checkbox
                            checked={selectedIds.includes(category.id)}
                            onCheckedChange={() => handleSelectOne(category.id)}
                        />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(category)}>
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
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={categoryToDelete?.name || ''}
      />
       <DeleteConfirmationDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        itemName={`(${selectedIds.length}) mục đã chọn`}
      />
    </>
  );
}
