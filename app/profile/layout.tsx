'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// this layout protects the profile page ensuring privacy by requiring authentication
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
