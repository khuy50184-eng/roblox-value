
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useItemActions } from "@/context/ItemContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Game } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  imageUrl: z.string().url({ message: "Vui lòng nhập một URL hình ảnh hợp lệ." }).optional().or(z.literal('')),
});

interface GameFormProps {
  setOpen: (open: boolean) => void;
  gameToEdit?: Game;
}

export function GameForm({ setOpen, gameToEdit }: GameFormProps) {
  const { addGame, updateGame } = useItemActions();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: gameToEdit?.name || "",
      imageUrl: gameToEdit?.imageUrl || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const gameData = {
        name: values.name,
        imageUrl: values.imageUrl || undefined,
    }
    if (gameToEdit) {
      updateGame({ ...gameData, id: gameToEdit.id });
      toast({ title: "Thành công!", description: "Đã cập nhật game." });
    } else {
      addGame(gameData);
      toast({ title: "Thành công!", description: "Đã thêm game mới." });
    }
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Game</FormLabel>
              <FormControl>
                <Input placeholder="Blox Fruits..." {...field} />
              </FormControl>
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
        <Button type="submit">{gameToEdit ? 'Lưu thay đổi' : 'Tạo Game'}</Button>
      </form>
    </Form>
  );
}
