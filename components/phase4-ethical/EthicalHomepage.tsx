"use client";

import React from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { useRouter } from 'next/navigation';

const EthicalHomepage = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Welcome to Ethical Lending</h1>
                    <p className="mt-2 text-lg text-gray-600">Financial support designed with your dignity and well-being in mind.</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <section className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">Ready to Start?</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        We offer two paths to explore ethical lending. You can go through our standard ethical checkout flow, or you can experience our comprehensive redesign, which includes a number of enhanced features.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button onClick={() => router.push('/ethical/application')} size="lg">
                            Standard Ethical Flow
                        </Button>
                        <Button onClick={() => router.push('/ethical/redesign')} size="lg" variant="secondary">
                            Comprehensive Redesign
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EthicalHomepage;
