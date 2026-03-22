import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/blog";
import { getAllShopProducts } from "@/lib/shop";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isAdminAuthenticated(cookieStore)) {
    redirect("/admin/login");
  }

  const [posts, products] = await Promise.all([getAllPosts(), getAllShopProducts()]);

  return <AdminDashboard initialPosts={posts} initialProducts={products} />;
}
