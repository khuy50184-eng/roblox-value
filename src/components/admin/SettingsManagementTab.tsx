
"use client";

import React, { useState } from 'react';
import { useItemState, useItemActions } from '@/context/ItemContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, RefreshCw, Download, Clipboard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_DATA_VERSION } from '@/lib/mock-data';

export function SettingsManagement() {
  const { usdRate, items, rarities, games, categories } = useItemState();
  const { setUsdRate, recalculateAllItemValues } = useItemActions();
  const [localRate, setLocalRate] = React.useState(usdRate);
  const [exportedData, setExportedData] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    const newRate = Number(localRate);
    if (!isNaN(newRate) && newRate > 0) {
      setUsdRate(newRate);
      toast({
        title: "Đã lưu tỷ giá",
        description: "Tỷ giá mới đã được lưu. Hãy nhấn nút đồng bộ để cập nhật giá vật phẩm.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng nhập một tỷ giá hợp lệ.",
      });
    }
  };

  const handleSync = () => {
    recalculateAllItemValues();
     toast({
        title: "Thành công!",
        description: "Đã đồng bộ lại giá VNĐ cho tất cả vật phẩm.",
      });
  }
  
  React.useEffect(() => {
    setLocalRate(usdRate);
  }, [usdRate]);

  const generateExportData = () => {
    const itemsStr = JSON.stringify(items, null, 2);
    const raritiesStr = JSON.stringify(rarities, null, 2);
    const gamesStr = JSON.stringify(games, null, 2);
    const categoriesStr = JSON.stringify(categories, null, 2);
    const usdRateStr = JSON.stringify(usdRate);

    const fileContent = `
import type { Item, Rarity, Game, Category } from './types';

// This data is exported from the Admin Panel.
// To update, generate new data from the "Data Management" tab and paste it here.

export const MOCK_DATA_VERSION = '${MOCK_DATA_VERSION}';
export const USD_RATE = ${usdRateStr};

const games: Game[] = ${gamesStr};

const rarities: Rarity[] = ${raritiesStr};

const categories: Category[] = ${categoriesStr};

const items: Item[] = ${itemsStr};

const mockData = {
    items,
    rarities,
    games,
    categories,
    usdRate: USD_RATE
};

export default mockData;
`;

    setExportedData(fileContent.trim());
    toast({
      title: "Đã tạo dữ liệu!",
      description: "Dữ liệu đã sẵn sàng để sao chép.",
    });
  };

  const copyToClipboard = () => {
    if (!exportedData) return;
    navigator.clipboard.writeText(exportedData);
    toast({
      title: "Đã sao chép!",
      description: "Nội dung file đã được sao chép vào clipboard.",
    });
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cài đặt & Dữ liệu</h1>
          <p className="text-muted-foreground">Quản lý các cài đặt chung và dữ liệu của ứng dụng.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt Tỷ giá</CardTitle>
          <CardDescription>
            Thiết lập tỷ giá chuyển đổi từ USD sang VNĐ và đồng bộ lại giá cho toàn bộ ứng dụng.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-sm">
          <div className="space-y-2">
              <Label htmlFor="usd-rate">Tỷ giá 1 USD sang VND</Label>
              <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                      id="usd-rate"
                      type="number"
                      placeholder="25000"
                      value={localRate}
                      onChange={(e) => setLocalRate(Number(e.target.value))}
                      className="pl-10"
                  />
              </div>
              <p className="text-xs text-muted-foreground">
                Ví dụ: Nhập <span className="font-semibold">25000</span> nếu 1 USD = 25,000 VNĐ.
              </p>
          </div>
          <Button onClick={handleSave}>Lưu Tỷ giá</Button>
          <Alert>
            <RefreshCw className="h-4 w-4" />
            <AlertTitle>Đồng bộ giá vật phẩm</AlertTitle>
            <AlertDescription>
              Sau khi thay đổi tỷ giá, hãy nhấn nút này để cập nhật lại giá VNĐ cho tất cả vật phẩm.
            </AlertDescription>
            <Button onClick={handleSync} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Đồng bộ lại giá
            </Button>
          </Alert>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Quản lý Dữ liệu</CardTitle>
          <CardDescription>
            Xuất dữ liệu hiện tại đang được lưu trong trình duyệt (localStorage) để cập nhật cho file mock-data.ts trong mã nguồn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg bg-secondary/30">
              <h3 className="font-semibold">Quy trình cập nhật:</h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 mt-2">
                  <li>Nhấn nút "Tạo và Hiển thị Dữ liệu".</li>
                  <li>Nhấn nút "Sao chép vào Clipboard".</li>
                  <li>Mở file <code className="bg-background p-1 rounded-sm text-primary">src/lib/mock-data.ts</code> trong code của bạn.</li>
                  <li>Xóa toàn bộ nội dung cũ và dán nội dung mới vào.</li>
              </ol>
          </div>
          
          <div className="flex gap-4">
              <Button onClick={generateExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Tạo và Hiển thị Dữ liệu
              </Button>
              {exportedData && (
                  <Button onClick={copyToClipboard} variant="secondary">
                      <Clipboard className="mr-2 h-4 w-4" />
                      Sao chép vào Clipboard
                  </Button>
              )}
          </div>

          {exportedData && (
            <div className="space-y-2">
              <label htmlFor="data-export" className="font-semibold">Nội dung file <code className="text-primary">mock-data.ts</code>:</label>
              <Textarea
                id="data-export"
                readOnly
                value={exportedData}
                className="h-80 w-full font-mono text-xs bg-background"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
