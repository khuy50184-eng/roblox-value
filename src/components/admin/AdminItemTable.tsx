
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import type { Item } from '@/lib/types';
import { Checkbox } from '../ui/checkbox';

interface AdminItemTableProps {
  items: Item[];
  onEdit: (item: Item) => void;
  selectedIds: string[];
  onSelectAll: () => void;
  onSelectOne: (id: string) => void;
}

export function AdminItemTable({ items, onEdit, selectedIds, onSelectAll, onSelectOne }: AdminItemTableProps) {
  const { rarities, games, categories, usdRate } = useItemState();
  const { deleteItem } = useItemActions();
  const [itemToDelete, setItemToDelete] = React.useState<Item | null>(null);

  const handleDeleteClick = (item: Item) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  const getRarityColor = (rarityName: string) => {
    const rarity = rarities.find(r => r.name === rarityName);
    return rarity ? rarity.color : '#808080'; // Default gray
  }

  const getGameName = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game ? game.name : 'N/A';
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  }

  const areAllSelected = items.length > 0 && items.every(item => selectedIds.includes(item.id));

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
                <Checkbox
                    checked={areAllSelected}
                    onCheckedChange={onSelectAll}
                    disabled={items.length === 0}
                />
            </TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Độ hiếm</TableHead>
            <TableHead className="text-right">Giá trị (USD)</TableHead>
            <TableHead className="text-right">Giá trị (VNĐ)</TableHead>
            <TableHead className="text-right w-[120px]">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => {
            const itemValueUSD = item.value || 0;
            const itemValueVND = Math.round(itemValueUSD * usdRate);
            return (
              <TableRow key={item.id}>
                <TableCell>
                    <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={() => onSelectOne(item.id)}
                    />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{getGameName(item.gameId)}</TableCell>
                <TableCell><Badge variant="secondary">{getCategoryName(item.categoryId)}</Badge></TableCell>
                <TableCell>
                  <Badge style={{ backgroundColor: getRarityColor(item.rarity) }} className="text-primary-foreground">
                      {item.rarity}
                    </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {`$${itemValueUSD.toFixed(2)}`}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {`${itemValueVND.toLocaleString('vi-VN')} VNĐ`}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <DeleteConfirmationDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.name || ''}
      />
    </>
  );
}
