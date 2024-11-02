import './globals.css'

export const metadata = {
  title: 'StatelyDB Starter',
  description: 'An example app using StatelyDB on Vercel.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <body className="min-h-screen flex flex-col items-center justify-start">
        {children}
      </body>
    </html>
  )
}
