"use client"

import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// export const metadata: Metadata = {
//   title: {
//     template: '%s - Pocket',
//     default: 'Pocket - Invest at the perfect time.',
//   },
//   description:
//     'By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.',
// }

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <html lang="zh" className={clsx('bg-gray-50 antialiased', inter.variable)}>
        <body>{children}</body>
      </html>
    </I18nextProvider>
  )
}

export default RootLayout;