
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Item } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useItemState } from '@/context/ItemContext';
import { CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';

interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelectToggle: (item: Item) => void;
}

export function ItemCard({ item, isSelected, onSelectToggle }: ItemCardProps) {
  const { rarities, usdRate } = useItemState();
  const rarityInfo = rarities.find(r => r.name === item.rarity);
  
  const itemValueVND = useMemo(() => {
    return Math.round((item.value || 0) * usdRate);
  }, [item.value, usdRate]);

  const handleCardClick = () => {
    onSelectToggle(item);
  };
  
  return (
    <Card
      onClick={handleCardClick}
      className={cn(
        "cursor-pointer transition-all duration-300 ease-in-out relative group bg-secondary/40 border overflow-hidden",
        "border-muted-foreground/30 hover:border-purple-500/80 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1",
        isSelected && 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-background border-cyan-500/80 bg-gradient-to-br from-secondary/40 to-cyan-500/20'
      )}
    >
       <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         style={{ opacity: isSelected ? 1 : undefined }}>
          <CheckCircle2
            className={cn(
              "h-6 w-6 text-white transition-all drop-shadow-lg",
              isSelected ? "fill-cyan-500" : "fill-foreground/50"
            )}
          />
        </div>
       
        <div className="relative w-full bg-secondary">
             {item.imageUrl ? (
                <>
                    <Image 
                        src={item.imageUrl}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-auto transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
                </>
            ) : (
                <div className="aspect-square w-full flex items-center justify-center">
                    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                </div>
            )}
        </div>

       <div className={cn(
           "p-3 text-foreground flex flex-col justify-end absolute inset-0 z-10",
            !item.imageUrl && "relative"
       )}>
        <p className="text-sm font-bold truncate text-white">{item.name}</p>
        <div className="flex items-center justify-between mt-1">
            <p className="text-xs font-semibold text-cyan-300">
            {`${itemValueVND.toLocaleString('vi-VN')} VNĐ`}
            </p>
            <Badge 
                className="shrink-0 text-xs text-primary-foreground border-none" 
                style={{ backgroundColor: rarityInfo?.color || '#808080' }}
            >
                {item.rarity}
            </Badge>
        </div>
      </div>
    </Card>
  );
}
