"use client";

import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ApprovedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const loanAmount = searchParams.get('loanAmount') || '500';
    const apr = searchParams.get('apr') || '450';

    const fee = (parseFloat(loanAmount) * (parseFloat(apr) / 100) / 26).toFixed(2);
    const totalRepayment = (parseFloat(loanAmount) + parseFloat(fee)).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <Card
                variant="success"
                className="w-full max-w-lg p-8 text-center"
            >
                <h1 className="text-3xl font-bold mb-4">Congratulations! You're Approved!</h1>
                <p className="text-lg mb-6">Your cash is on its way to your account.</p>
                
                <div className="bg-white rounded-lg p-6 mb-6 text-left shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Loan Details</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Loan Amount:</span>
                            <span className="font-bold text-gray-900">${loanAmount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">APR (Annual Percentage Rate):</span>
                            <span className="font-bold text-red-600">{apr}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Finance Charge (Bi-weekly):</span>
                            <span className="font-bold text-gray-900">${fee}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3 mt-3">
                            <span className="text-gray-600 font-bold">Total Repayment (Bi-weekly):</span>
                            <span className="font-bold text-xl text-gray-900">${totalRepayment}</span>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-gray-500 mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p><strong>Important:</strong> This is a short-term loan. The cost of your loan may be higher than loans offered by other lending institutions. This loan is designed to help you meet your short-term borrowing needs. It is not a solution for longer-term financial problems.</p>
                </div>
                
                <Button
                    onClick={() => router.push('/reflection')}
                    className="w-full"
                    size='lg'
                >
                    Continue to Next Phase: Reflection
                </Button>
            </Card>
        </div>
    );
}

export default function ApprovedPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
                <p>Loading approval details...</p>
            </div>
        }>
            <ApprovedContent />
        </Suspense>
    );
}
