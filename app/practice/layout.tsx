'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// this layout wraps the practice area to ensure only logged in users can access it
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
