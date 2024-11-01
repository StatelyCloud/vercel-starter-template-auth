import { getLink } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = await getLink(slug);

  if (link) {
    return redirect(link.url);
  }

  return notFound();
}
