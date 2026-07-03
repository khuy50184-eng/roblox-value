
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, useMemo } from "react";
import { useItemState, useItemActions } from "@/context/ItemContext";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Item, Category, Rarity } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowRight, DollarSign } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  value: z.string().refine(val => !isNaN(parseFloat(val.replace(',', '.'))) && parseFloat(val.replace(',', '.')) >= 0, {
    message: "Giá trị USD phải là một số dương.",
  }),
  rarity: z.string().min(1, { message: "Vui lòng chọn độ hiếm." }),
  categoryId: z.string().min(1, { message: "Vui lòng chọn một category." }),
  gameId: z.string().min(1, { message: "Vui lòng chọn một game." }),
  imageUrl: z.string().url({ message: "Vui lòng nhập một URL hình ảnh hợp lệ." }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface ItemFormProps {
  setOpen: (open: boolean) => void;
  itemToEdit?: Item;
  preselectedGameId?: string; // To pre-fill the game
}

export function ItemForm({ setOpen, itemToEdit, preselectedGameId }: ItemFormProps) {
  const { toast } = useToast();
  const { rarities, games, categories, usdRate } = useItemState();
  const { addItem, updateItem } = useItemActions();
  
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredRarities, setFilteredRarities] = useState<Rarity[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: itemToEdit
      ? { ...itemToEdit, value: String(itemToEdit.value), imageUrl: itemToEdit.imageUrl || "" }
      : {
          name: "",
          value: "0",
          rarity: "",
          categoryId: "",
          gameId: preselectedGameId || "",
          imageUrl: "",
        },
  });

  const { control, handleSubmit, watch, setValue, reset } = form;
  const selectedGameId = watch("gameId");
  const usdValueStr = watch("value");

  const calculatedVND = useMemo(() => {
    const numericValue = parseFloat(String(usdValueStr).replace(',', '.'));
    if (isNaN(numericValue) || isNaN(usdRate) || usdRate === 0) {
      return 0;
    }
    return Math.round(numericValue * usdRate);
  }, [usdValueStr, usdRate]);


  useEffect(() => {
    // When the selected game changes, filter categories and rarities
    if (selectedGameId) {
      const gameCategories = categories.filter(c => c.gameId === selectedGameId);
      setFilteredCategories(gameCategories);
      
      const gameRarities = rarities.filter(r => r.gameId === selectedGameId || !r.gameId);
      setFilteredRarities(gameRarities);

      // Reset category and rarity if they are no longer valid for the new game
      const currentCategoryId = form.getValues("categoryId");
      if (currentCategoryId && !gameCategories.some(c => c.id === currentCategoryId)) {
        setValue("categoryId", ""); 
      }
      const currentRarityName = form.getValues("rarity");
      if (currentRarityName && !gameRarities.some(r => r.name === currentRarityName)) {
        setValue("rarity", ""); 
      }
    } else {
      setFilteredCategories([]);
      setFilteredRarities([]);
    }
  }, [selectedGameId, categories, rarities, setValue, form]);

  useEffect(() => {
    // When itemToEdit changes, reset the form with the new values.
    const initialValues = itemToEdit
      ? { ...itemToEdit, value: String(itemToEdit.value), imageUrl: itemToEdit.imageUrl || "" }
      : {
          name: "",
          value: "0",
          rarity: "",
          categoryId: "",
          gameId: preselectedGameId || "",
          imageUrl: "",
        };
    reset(initialValues);

    // Manually trigger filtering for the initial load when editing
    if (itemToEdit || preselectedGameId) {
        const gameId = itemToEdit?.gameId || preselectedGameId;
        if(gameId) {
            const gameCategories = categories.filter(c => c.gameId === gameId);
            setFilteredCategories(gameCategories);
            const gameRarities = rarities.filter(r => r.gameId === gameId || !r.gameId);
            setFilteredRarities(gameRarities);
        }
    }

  }, [itemToEdit, preselectedGameId, reset, categories, rarities]);

  function onSubmit(values: FormValues) {
    const itemData = {
        name: values.name,
        value: parseFloat(values.value.replace(',', '.')),
        rarity: values.rarity,
        categoryId: values.categoryId,
        gameId: values.gameId,
        imageUrl: values.imageUrl || undefined,
    };
    
    if (itemToEdit) {
      updateItem({ ...itemData, id: itemToEdit.id });
      toast({ title: "Thành công!", description: "Đã cập nhật vật phẩm." });
    } else {
      addItem(itemData);
      toast({ title: "Thành công!", description: "Đã thêm vật phẩm mới." });
    }
    setOpen(false);
  }

  return (
    <Form {...form}>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="h-[60vh] pr-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Nhập tên, giá trị (USD) và hình ảnh của vật phẩm.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên vật phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="Leopard Fruit..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={control}
                  name="value"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá trị (USD)</FormLabel>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                    <Input type="text" placeholder="4.99" {...field} className="pl-10"/>
                                </FormControl>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                            <div className="flex-1 rounded-md border border-dashed p-2 text-center">
                               <p className="font-semibold">{calculatedVND.toLocaleString('vi-VN')} VNĐ</p>
                            </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL Hình ảnh</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Phân loại</CardTitle>
                    <CardDescription>Phân loại vật phẩm vào game, category và độ hiếm.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={control}
                    name="gameId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Game</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!!preselectedGameId}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn một game" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {games.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                
                    <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="categoryId"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedGameId}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Chọn một category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {filteredCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="rarity"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Độ hiếm</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedGameId}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Chọn độ hiếm" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {filteredRarities.map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <div className="pt-6 flex justify-end">
            <Button type="submit">{itemToEdit ? 'Lưu thay đổi' : 'Tạo vật phẩm'}</Button>
        </div>
      </form>
    </Form>
  );
}
