
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { PlusCircle, Edit, Trash2, Package, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import type { Rarity } from '@/lib/types';
import { RarityForm } from './RarityForm';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const RarityTable = ({
    rarities,
    onEdit,
    onDelete,
    selectedIds,
    onSelectAll,
    onSelectOne,
    isAllSelected
}: {
    rarities: Rarity[];
    onEdit: (rarity: Rarity) => void;
    onDelete: (rarity: Rarity) => void;
    selectedIds: string[];
    onSelectAll: () => void;
    onSelectOne: (id: string) => void;
    isAllSelected: boolean;
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox
                            checked={isAllSelected && rarities.length > 0}
                            onCheckedChange={onSelectAll}
                            disabled={rarities.length === 0}
                        />
                    </TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Màu sắc</TableHead>
                    <TableHead>Thứ tự</TableHead>
                    <TableHead className="text-right w-[120px]">Hành động</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rarities.map(rarity => (
                    <TableRow key={rarity.id}>
                        <TableCell>
                            <Checkbox
                                checked={selectedIds.includes(rarity.id)}
                                onCheckedChange={() => onSelectOne(rarity.id)}
                            />
                        </TableCell>
                        <TableCell className="font-medium">{rarity.name}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: rarity.color }}></div>
                                <Badge variant="outline">{rarity.color}</Badge>
                            </div>
                        </TableCell>
                        <TableCell>{rarity.order}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(rarity)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(rarity)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export function RarityManagement() {
  const { rarities, games } = useItemState();
  const { deleteRarity } = useItemActions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRarity, setEditingRarity] = useState<Rarity | undefined>(undefined);
  const [rarityToDelete, setRarityToDelete] = useState<Rarity | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);


  const handleEdit = (rarity: Rarity) => {
    setEditingRarity(rarity);
    setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingRarity(undefined);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (rarity: Rarity) => {
    setRarityToDelete(rarity);
  };

  const handleConfirmDelete = () => {
    if (rarityToDelete) {
      deleteRarity(rarityToDelete.id);
      setRarityToDelete(null);
    }
  };
  
  const handleConfirmBulkDelete = () => {
    selectedIds.forEach(id => deleteRarity(id));
    setSelectedIds([]);
    setIsBulkDeleteOpen(false);
  };

  const { globalRarities, raritiesByGame } = useMemo(() => {
    const globalRarities = rarities
        .filter(r => !r.gameId)
        .sort((a,b) => a.order - b.order);

    const raritiesByGame = games.map(game => ({
        ...game,
        rarities: rarities
            .filter(r => r.gameId === game.id)
            .sort((a,b) => a.order - b.order)
    }));

    return { globalRarities, raritiesByGame };
  }, [rarities, games]);

  const handleSelectAll = (rarityList: Rarity[]) => {
    const allIds = rarityList.map(r => r.id);
    const areAllSelected = allIds.every(id => selectedIds.includes(id));
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
  
  const allGameIds = useMemo(() => games.map(g => g.id), [games]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Độ hiếm</h1>
          <p className="text-muted-foreground">Quản lý các độ hiếm chung và độ hiếm theo từng game.</p>
        </div>
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
                  Thêm Độ hiếm
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingRarity ? 'Sửa Độ hiếm' : 'Thêm Độ hiếm Mới'}</DialogTitle>
                </DialogHeader>
                <RarityForm setOpen={setIsDialogOpen} rarityToEdit={editingRarity} />
              </DialogContent>
            </Dialog>
          </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Độ hiếm chung
            </CardTitle>
            <CardDescription>Các độ hiếm này có thể được sử dụng trong tất cả các game.</CardDescription>
        </CardHeader>
        <CardContent>
            {globalRarities.length > 0 ? (
                <RarityTable
                    rarities={globalRarities}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    selectedIds={selectedIds}
                    onSelectOne={handleSelectOne}
                    onSelectAll={() => handleSelectAll(globalRarities)}
                    isAllSelected={globalRarities.length > 0 && globalRarities.every(r => selectedIds.includes(r.id))}
                />
             ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-secondary/20 rounded-md border border-dashed">
                    <Package className="h-10 w-10 mb-2" />
                    <p className="font-medium">Không có Độ hiếm chung</p>
                    <p className="text-sm">Chọn "Chung cho tất cả Game" trong form để tạo.</p>
                </div>
             )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Độ hiếm theo Game</CardTitle>
            <CardDescription>Các độ hiếm này chỉ áp dụng cho game được chỉ định.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="multiple" defaultValue={allGameIds} className="w-full">
            {raritiesByGame.map(game => (
                <AccordionItem value={game.id} key={game.id}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        {game.name} ({game.rarities.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      {game.rarities.length > 0 ? (
                       <RarityTable
                            rarities={game.rarities}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                            selectedIds={selectedIds}
                            onSelectOne={handleSelectOne}
                            onSelectAll={() => handleSelectAll(game.rarities)}
                            isAllSelected={game.rarities.length > 0 && game.rarities.every(r => selectedIds.includes(r.id))}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-secondary/20 rounded-md">
                            <Package className="h-10 w-10 mb-2" />
                            <p className="font-medium">Không có Độ hiếm nào</p>
                            <p className="text-sm">Chưa có độ hiếm nào được tạo cho game này.</p>
                        </div>
                      )}
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        isOpen={!!rarityToDelete}
        onClose={() => setRarityToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={rarityToDelete?.name || ''}
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
