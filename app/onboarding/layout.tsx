'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// this layout ensures that only authenticated users can access the onboarding flow
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}
