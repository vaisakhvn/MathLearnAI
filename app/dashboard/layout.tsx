'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// this is a layout wrapper for the dashboard that enforces authentication
// it wraps the children components in the protected route component
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
