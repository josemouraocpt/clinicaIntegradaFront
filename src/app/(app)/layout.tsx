import { NavBarAuth } from "@/components/NavBarAuth"

export const metadata = {
    title: 'Clínica Integrada Unibh - HelthLab 4.0',
    description: 'Clínica Integrada Unibh - HelthLab 4.0',
          viewport: {
              width: 'device-width',
              initialScale: 1,
              maximumScale: 1
          }
}

export default function AppLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <NavBarAuth/>
        {children}
      </>
    )
  }
  