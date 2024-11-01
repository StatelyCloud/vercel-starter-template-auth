import { keyId } from "@stately-cloud/client";
import { createLink, fetchLinks } from "@/lib/actions";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
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
            className="border p-2 w-full rounded"
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
            className="border p-2 w-full rounded"
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
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Short Name</th>
            <th className="px-4 py-2">URL</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={keyId(link.id)} className="border-t">
              <td className="px-4 py-2">
                <a href={link.short} className="text-blue-500 underline">
                  {link.short}
                </a>
              </td>
              <td className="px-4 py-2">{link.url}</td>
              <td className="px-4 py-2">
                {new Date(Number(link.createdAt)).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
