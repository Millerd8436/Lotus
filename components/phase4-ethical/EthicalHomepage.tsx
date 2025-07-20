"use client";

import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import EthicalCheckoutFlow from './EthicalCheckoutFlow';

const EthicalHomepage = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [loanAmount, setLoanAmount] = useState(500);

    if (showCheckout) {
        return <EthicalCheckoutFlow loanAmount={loanAmount} onBack={() => setShowCheckout(false)} />;
    }

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
                    <h2 className="text-3xl font-bold mb-4">A Radically Different Approach to Lending</h2>
                    <p className="max-w-3xl mx-auto text-gray-700 mb-8">
                        We believe that access to short-term credit shouldn't come at the cost of your financial future.
                        Our process is built on transparency, fairness, and a genuine commitment to your success.
                    </p>
                    <Button size="lg" onClick={() => setShowCheckout(true)}>
                        Start Your Application
                    </Button>
                </section>

                <section className="mt-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <Card.Header>
                                <Card.Title>Total Transparency</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <p>No hidden fees. No confusing jargon. We show you the total cost of your loan upfront, in plain English, before you commit to anything.</p>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title>Flexible & Fair</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <p>We offer repayment plans that work with your budget, not against it. Our goal is to help you get back on your feet, not trap you in a cycle of debt.</p>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title>Empowerment, Not Exploitation</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <p>We provide free access to financial literacy resources and connect you with non-profit credit counseling to help you build a stronger financial future.</p>
                            </Card.Content>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EthicalHomepage;
