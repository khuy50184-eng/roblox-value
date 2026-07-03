
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useItemActions, useItemState } from "@/context/ItemContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Rarity } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, { message: "Mã màu không hợp lệ." }),
  order: z.coerce.number().int().min(0, { message: "Thứ tự phải là một số dương." }),
  gameId: z.string(), // Can be 'global' or a game id
});

interface RarityFormProps {
  setOpen: (open: boolean) => void;
  rarityToEdit?: Rarity;
}

export function RarityForm({ setOpen, rarityToEdit }: RarityFormProps) {
  const { games } = useItemState();
  const { addRarity, updateRarity } = useItemActions();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: rarityToEdit?.name || "",
      color: rarityToEdit?.color || "#808080",
      order: rarityToEdit?.order || 0,
      gameId: rarityToEdit?.gameId || "global",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const rarityData = {
        name: values.name,
        color: values.color,
        order: values.order,
        gameId: values.gameId === 'global' ? undefined : values.gameId,
    };

    if (rarityToEdit) {
      updateRarity({ ...rarityData, id: rarityToEdit.id });
      toast({ title: "Thành công!", description: "Đã cập nhật độ hiếm." });
    } else {
      addRarity(rarityData);
      toast({ title: "Thành công!", description: "Đã thêm độ hiếm mới." });
    }
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="gameId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Game</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn một game" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="global">Chung cho tất cả Game</SelectItem>
                        {games.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Độ hiếm</FormLabel>
              <FormControl>
                <Input placeholder="Legendary..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Màu sắc</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input type="color" {...field} className="p-1 h-10 w-14"/>
                    <Input type="text" {...field} placeholder="#FFD700" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thứ tự</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">{rarityToEdit ? 'Lưu thay đổi' : 'Tạo Độ hiếm'}</Button>
      </form>
    </Form>
  );
}
