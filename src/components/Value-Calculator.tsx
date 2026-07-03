
"use client";

import { useContext, useState } from 'react';
import { ItemContext } from '@/context/ItemContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, X, Trophy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ValueCalculator() {
  const context = useContext(ItemContext);
  const [currency, setCurrency] = useState('VND');

  if (!context) {
    throw new Error('ValueCalculator must be used within an ItemProvider');
  }

  const { selectedItems, clearSelection, toggleSelectedItem, rarities } = context;

  const conversionRates: { [key: string]: number } = {
    'VND': 1,
    'USD': 25000,
  };

  const totalValueInVND = selectedItems.reduce((sum, item) => sum + (item.value || 0), 0);
  const totalValue = totalValueInVND / conversionRates[currency];

  const formatCurrency = (value: number, currencyCode: string) => {
    const rate = conversionRates[currencyCode] || 1;
    const convertedValue = value / rate;
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: currencyCode === 'USD' ? 2 : 0,
        maximumFractionDigits: currencyCode === 'USD' ? 2 : 0,
    }).format(convertedValue);
  }

  const getRarityColor = (rarityName: string) => {
    const rarity = rarities.find(r => r.name === rarityName);
    return rarity ? rarity.color : '#808080';
  }

  return (
    <Card className="shadow-lg bg-secondary/30 border-blue-500/30">
        <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-orange-400" />
                    <div>
                        <CardTitle className="text-xl">Tổng giá trị</CardTitle>
                        <CardDescription>{selectedItems.length} vật phẩm đã chọn</CardDescription>
                    </div>
                </div>
                 <div className="w-full sm:w-auto max-w-[120px]">
                    <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-full border-muted-foreground/50 focus:border-blue-500 focus:ring-blue-500">
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
            <p className="mt-4 text-3xl font-bold text-blue-400">
                {formatCurrency(totalValueInVND, currency)}
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
                      <p className="text-sm text-muted-foreground">{formatCurrency(item.value || 0, currency)}</p>
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
