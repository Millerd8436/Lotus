// Global styles for the Lotus 3-Phase Simulator
// This provides all the styling needed for the comprehensive simulator

// CSS-in-JS styles for the simulator
export const simulatorCSS = `
/* Phase Indicator */
.phase-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.phase {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: #6b7280;
}

.phase.active {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.phase.completed {
  background: #10b981;
  color: white;
}

.phase-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.phase-name {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Echo Messages */
.echo-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 300px;
}

.echo-message {
  background: #1f2937;
  color: #fbbf24;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Main Content */
.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.phase-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.phase-header {
  text-align: center;
  margin-bottom: 2rem;
}

.phase-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.125rem;
  color: #6b7280;
}

/* Exploitative Phase Styles */
.exploitative {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid #ef4444;
}

.exploitative .phase-header h2 {
  color: #dc2626;
}

/* Urgency Banner */
.urgency-banner {
  background: #dc2626;
  color: white;
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.urgent-text {
  font-weight: bold;
  margin-right: 1rem;
}

.countdown-timer {
  font-family: monospace;
  font-size: 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

/* Form Styles */
.loan-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.amount-display {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #059669;
  margin-top: 0.5rem;
}

/* Fee Display Trap */
.fee-display-trap {
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
}

.prominent-fee {
  text-align: center;
}

.fee-amount {
  font-size: 2.5rem;
  font-weight: bold;
  color: #059669;
}

.fee-per {
  font-size: 1.125rem;
  color: #6b7280;
  margin-left: 0.5rem;
}

.hidden-apr {
  font-size: 8px !important;
  color: #9ca3af !important;
  margin-top: 15px !important;
}

/* Ghost Mode */
.ghost-revealed {
  border: 2px solid #ef4444 !important;
  background: rgba(239, 68, 68, 0.1) !important;
}

.ghost-warning {
  background: #1f2937;
  color: #fbbf24;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

/* Checkbox Styles */
.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-container input {
  margin-right: 0.5rem;
  transform: scale(1.2);
}

.small-text {
  font-size: 0.875rem;
  color: #6b7280;
}

/* ACH Exploitation */
.ach-exploitation {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.ach-benefits {
  margin: 0.75rem 0;
  font-size: 0.875rem;
  color: #059669;
}

.overdraft-warning {
  font-size: 8px !important;
  color: #9ca3af !important;
  margin-top: 10px !important;
}

/* Buttons */
.btn-primary-exploitative {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-primary-exploitative:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(185, 28, 28, 0.4);
}

.btn-primary-ethical {
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

.btn-primary-ethical:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-ghost {
  background: #1f2937;
  color: #fbbf24;
  border: 2px solid #fbbf24;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
}

.btn-ghost:hover {
  background: #fbbf24;
  color: #1f2937;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
}

/* Loan Results */
.loan-results {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 0.5rem;
}

.approval-celebration {
  text-align: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.approval-celebration h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.approval-text {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.fake-timer {
  font-family: monospace;
  font-size: 1.125rem;
}

.terms-buried {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.prominent-terms {
  text-align: center;
  margin-bottom: 1rem;
}

.amount-big {
  font-size: 3rem;
  font-weight: bold;
  color: #059669;
}

.fee-small {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.buried-terms {
  font-size: 8px !important;
  color: #9ca3af !important;
  text-align: center;
}

/* Ethical Phase Styles */
.ethical {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 2px solid #10b981;
}

.ethical .phase-header h2 {
  color: #059669;
}

.transparent-pricing {
  background: white;
  border: 2px solid #10b981;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.pricing-table {
  display: grid;
  gap: 0.75rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.price-row.total {
  border-top: 2px solid #10b981;
  font-weight: bold;
  font-size: 1.125rem;
}

.price-row.apr-prominent {
  background: #fef3c7;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid #f59e0b;
}

.apr-large {
  font-size: 1.5rem;
  font-weight: bold;
  color: #d97706;
}

.ethical-consent {
  background: #f0f9ff;
  border: 2px solid #3b82f6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.consent-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  cursor: pointer;
}

.consent-item input {
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  transform: scale(1.2);
}

/* Comparison Section */
.comparison-section {
  margin-top: 3rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.comparison-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.comparison-header {
  display: contents;
  font-weight: bold;
}

.comparison-row {
  display: contents;
}

.comparison-row > div {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.comparison-row > div:first-child {
  background: #f3f4f6;
  font-weight: 600;
}

.comparison-row .exploitative {
  background: #fee2e2;
  color: #dc2626;
}

.comparison-row .ethical {
  background: #ecfdf5;
  color: #059669;
}

/* Reflection Phase Styles */
.reflection {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 2px solid #1e3a8a;
}

.reflection .phase-header h2 {
  color: #7c3aed;
}

.reflection-dashboard {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.analysis-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.analysis-card h3 {
  color: #374151;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

/* Coercion Index */
.coercion-score {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
}

.score-circle.score-extreme {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
}

.score-circle.score-high {
  background: linear-gradient(135deg, #ea580c, #dc2626);
  color: white;
}

.score-circle.score-moderate {
  background: linear-gradient(135deg, #f59e0b, #ea580c);
  color: white;
}

.score-circle.score-low {
  background: linear-gradient(135deg, #eab308, #f59e0b);
  color: white;
}

.score-circle.score-minimal {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.score-number {
  font-size: 2rem;
}

.score-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

.score-interpretation {
  flex: 1;
}

.score-interpretation strong {
  display: block;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

/* Choice Illusions */
.illusion-item {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.user-thought {
  margin-bottom: 0.5rem;
  color: #374151;
}

.reality {
  margin-bottom: 0.5rem;
  color: #dc2626;
}

.manipulation-type {
  font-style: italic;
  color: #6b7280;
}

/* Autonomy Violations */
.violations-summary {
  background: #fee2e2;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.violation-item {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.violation-type {
  font-weight: bold;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.violation-description {
  margin-bottom: 0.5rem;
  color: #374151;
}

.violation-severity {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.kantian-violation {
  font-size: 0.875rem;
  font-style: italic;
  color: #7c3aed;
}

/* Comparison Grid */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.comparison-metric {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  text-align: center;
}

.metric-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #374151;
}

.metric-exploitative {
  color: #dc2626;
  font-weight: bold;
}

.metric-ethical {
  color: #059669;
  font-weight: bold;
}

.metric-vs {
  color: #6b7280;
  margin: 0 0.5rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #059669;
}

.comparison-metric.savings {
  background: #ecfdf5;
  border-color: #10b981;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin-bottom: 1rem;
  color: #374151;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.upsell-benefits {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  text-align: left;
}

.reflection-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .phase-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .app-main {
    padding: 1rem;
  }
  
  .comparison-table {
    grid-template-columns: 1fr;
  }
  
  .coercion-score {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-content {
    margin: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .reflection-actions {
    flex-direction: column;
  }
}

/* Hidden Class */
.hidden {
  display: none !important;
}

/* Auto-renewal trap styles */
.auto-renew-trap {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

/* Approval transparent styles */
.approval-transparent {
  background: #ecfdf5;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 2px solid #10b981;
}

.terms-clear {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.term-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.term-row.total {
  border-top: 2px solid #10b981;
  border-bottom: 2px solid #10b981;
  font-weight: bold;
  font-size: 1.125rem;
}

.repayment-info {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  text-align: left;
}

.repayment-info h4 {
  margin-bottom: 0.5rem;
  color: #1e40af;
}

.repayment-info p {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}
`;
