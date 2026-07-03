
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useItemState, useItemActions } from "@/context/ItemContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  gameId: z.string().min(1, { message: "Vui lòng chọn một game." }),
});

interface CategoryFormProps {
  setOpen: (open: boolean) => void;
  categoryToEdit?: Category;
  preselectedGameId?: string; // To pre-fill the game
}

export function CategoryForm({ setOpen, categoryToEdit, preselectedGameId }: CategoryFormProps) {
  const { games } = useItemState();
  const { addCategory, updateCategory } = useItemActions();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: categoryToEdit || {
      name: "",
      gameId: preselectedGameId || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (categoryToEdit) {
      updateCategory({ ...values, id: categoryToEdit.id });
      toast({ title: "Thành công!", description: "Đã cập nhật category." });
    } else {
      addCategory(values);
      toast({ title: "Thành công!", description: "Đã thêm category mới." });
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
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!preselectedGameId}>
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Category</FormLabel>
              <FormControl>
                <Input placeholder="Vũ khí..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{categoryToEdit ? 'Lưu thay đổi' : 'Tạo Category'}</Button>
      </form>
    </Form>
  );
}
