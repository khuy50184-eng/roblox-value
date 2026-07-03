
"use client";

import { useItemState, useItemActions } from '@/context/ItemContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, X, Trophy } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ValueCalculator() {
  const { selectedItems, rarities, usdRate } = useItemState();
  const { clearSelection, toggleSelectedItem } = useItemActions();
  const [currency, setCurrency] = useState('VND');

  const totalValueInUSD = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.value || 0), 0);
  }, [selectedItems]);
  
  const totalValueInVND = useMemo(() => {
     return Math.round(totalValueInUSD * usdRate);
  }, [totalValueInUSD, usdRate]);


  const conversionRates: { [key: string]: number } = {
    'VND': 1,
    'USD': usdRate,
  };

  const getDisplayValue = () => {
    if (currency === 'VND') {
        return totalValueInVND.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    // currency === 'USD'
    return totalValueInUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const getItemDisplayValue = (itemValueUSD: number) => {
     if (currency === 'VND') {
        return Math.round(itemValueUSD * usdRate).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    // currency === 'USD'
    return itemValueUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const getRarityColor = (rarityName: string) => {
    const rarity = rarities.find(r => r.name === rarityName);
    return rarity ? rarity.color : '#808080';
  }

  return (
    <Card className="shadow-lg bg-secondary/30 border-purple-500/30">
        <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                    <div>
                        <CardTitle className="text-xl">Tổng giá trị</CardTitle>
                        <CardDescription>{selectedItems.length} vật phẩm đã chọn</CardDescription>
                    </div>
                </div>
                 <div className="w-full sm:w-auto max-w-[120px]">
                    <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-full border-muted-foreground/50 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="VND">
                                <div className="flex items-center gap-2">
                                   <span>🇻🇳</span>
                                   <span>VND</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="USD">
                                <div className="flex items-center gap-2">
                                   <span>🇺🇸</span>
                                   <span>USD</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-cyan-400">
                {getDisplayValue()}
            </p>
        </CardHeader>
      <CardContent className="p-4 pt-0">
        <Separator className="mb-4" />
        {selectedItems.length > 0 ? (
          <ScrollArea className="h-80 pr-3">
            <div className="space-y-3">
              {selectedItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-2 rounded-md bg-background/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                     <div className="w-1.5 h-10 rounded-full" style={{backgroundColor: getRarityColor(item.rarity)}}></div>
                    <div className="flex-grow overflow-hidden">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{getItemDisplayValue(item.value || 0)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => toggleSelectedItem(item)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background/30">
            <p className="text-center text-muted-foreground px-4">Chọn các mục để tính tổng giá trị của chúng.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          className="w-full"
          onClick={clearSelection}
          disabled={selectedItems.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa lựa chọn
        </Button>
      </CardFooter>
    </Card>
  );
}
