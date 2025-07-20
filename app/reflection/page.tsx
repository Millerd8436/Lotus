"use client";
import ReflectionDashboard from "@/components/reflection/ReflectionDashboard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Suspense } from "react";

export default function ReflectionPage() {
    return (
        <div>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner />
                    <p>Loading reflection dashboard...</p>
                </div>
            }>
                <ReflectionDashboard />
            </Suspense>
        </div>
    );
}
