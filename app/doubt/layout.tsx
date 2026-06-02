'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// this layout protects the doubt resolver page requiring authentication
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
