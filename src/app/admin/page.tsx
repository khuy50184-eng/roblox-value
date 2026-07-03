
"use client";

import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to the new dashboard page by default
  redirect('/admin/dashboard');
}
