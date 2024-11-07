import { keyId } from "@stately-cloud/client";
import { createLink, fetchLinks } from "@/lib/actions";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const session = await auth();
  const links = await fetchLinks();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Link Dashboard</h1>
      <form action={createLink} className="mb-4 p-4 rounded shadow-md bg-gray-100 dark:bg-gray-800">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="short">
            Short Name
          </label>
          <input
            id="short"
            name="short"
            type="text"
            placeholder="Short name (eg: cnn)"
            className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="url">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            placeholder="URL (eg: https://cnn.com)"
            className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            required
            pattern="https?://.+"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Go Link
          </button>
        </div>
      </form>
      <table className="table-auto w-full mb-8 border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left">Short Name</th>
            <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left">URL</th>
            <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={keyId(link.id)} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <a href={link.short} className="text-blue-500 dark:text-blue-400 underline">
                  {link.short}
                </a>
              </td>
              <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{link.url}</td>
              <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                {new Date(Number(link.createdAt)).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {session && (
        <div className="flex justify-between items-center mt-4 p-4 border-t">
          <div>
            <p className="text-sm">Signed in as {session?.user?.email || "unknown"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
