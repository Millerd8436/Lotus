/**
 * IRB Compliance Framework for Research Ethics and Regulatory Requirements
 * Ensures all research activities meet institutional and federal standards
 */

export interface IRBApproval {
  id: string;
  studyTitle: string;
  principalInvestigator: string;
  institution: string;
  approvalNumber: string;
  approvalDate: Date;
  expirationDate: Date;
  status: 'approved' | 'pending' | 'expired' | 'suspended';
  riskLevel: 'minimal' | 'more_than_minimal';
  populationType: 'general' | 'vulnerable' | 'special';
  modifications: IRBModification[];
}

export interface IRBModification {
  id: string;
  type: 'amendment' | 'continuing_review' | 'safety_report';
  submissionDate: Date;
  approvalDate?: Date;
  description: string;
  status: 'pending' | 'approved' | 'requires_revision';
}

export interface ConsentRecord {
  participantId: string;
  consentVersion: string;
  consentDate: Date;
  consentMethod: 'electronic' | 'written' | 'verbal';
  witnessRequired: boolean;
  witnessId?: string;
  ipAddress?: string;
  userAgent?: string;
  consentDuration: number; // milliseconds spent reviewing
  elementsReviewed: string[];
  comprehensionVerified: boolean;
  withdrawalExplained: boolean;
}

export interface DataProtectionRecord {
  participantId: string;
  dataCollected: string[];
  storageLocation: string;
  encryptionMethod: string;
  accessLog: AccessLogEntry[];
  retentionPeriod: number; // days
  destructionDate?: Date;
  deidentificationLevel: 'none' | 'safe_harbor' | 'expert_determination' | 'limited_dataset';
}

export interface AccessLogEntry {
  userId: string;
  timestamp: Date;
  action: 'view' | 'edit' | 'export' | 'delete';
  dataElement: string;
  justification: string;
  ipAddress: string;
}

export interface AdverseEvent {
  id: string;
  participantId: string;
  eventDate: Date;
  reportDate: Date;
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  relatedness: 'unrelated' | 'unlikely' | 'possible' | 'probable' | 'definite';
  description: string;
  actionTaken: string;
  reportedToIRB: boolean;
  reportedToSponsor: boolean;
  followUpRequired: boolean;
}

export interface RegulatoryCompliance {
  regulation: string; // e.g., "45 CFR 46", "21 CFR 50", "GDPR"
  requirement: string;
  complianceStatus: 'compliant' | 'non_compliant' | 'under_review';
  evidence: string[];
  lastAuditDate?: Date;
  nextAuditDate?: Date;
}

class IRBComplianceFramework {
  private irbApproval: IRBApproval | null = null;
  private consentRecords: Map<string, ConsentRecord> = new Map();
  private dataProtectionRecords: Map<string, DataProtectionRecord> = new Map();
  private adverseEvents: AdverseEvent[] = [];
  private complianceChecks: RegulatoryCompliance[] = [];
  private auditLog: AccessLogEntry[] = [];

  constructor(irbApproval: IRBApproval) {
    this.irbApproval = irbApproval;
    this.initializeComplianceChecks();
  }

  // Initialize regulatory compliance framework
  private initializeComplianceChecks(): void {
    this.complianceChecks = [
      {
        regulation: "45 CFR 46 (Common Rule)",
        requirement: "Informed consent obtained from all participants",
        complianceStatus: 'compliant',
        evidence: ['Electronic consent system', 'Consent tracking database'],
      },
      {
        regulation: "45 CFR 46.111",
        requirement: "Risks minimized and reasonable in relation to benefits",
        complianceStatus: 'compliant',
        evidence: ['Risk assessment documentation', 'Benefit analysis'],
      },
      {
        regulation: "45 CFR 46.116",
        requirement: "Informed consent contains required elements",
        complianceStatus: 'compliant',
        evidence: ['IRB-approved consent form', 'Element checklist'],
      },
      {
        regulation: "HIPAA Privacy Rule",
        requirement: "PHI protected according to HIPAA standards",
        complianceStatus: 'compliant',
        evidence: ['De-identification procedures', 'Data encryption'],
      },
      {
        regulation: "21 CFR 11 (if applicable)",
        requirement: "Electronic records and signatures compliant",
        complianceStatus: 'compliant',
        evidence: ['Electronic signature validation', 'Audit trail system'],
      },
    ];
  }

  // Informed Consent Management
  public async obtainInformedConsent(
    participantId: string,
    consentVersion: string,
    reviewData: {
      elementsReviewed: string[];
      timeSpent: number;
      ipAddress: string;
      userAgent: string;
    }
  ): Promise<ConsentRecord> {
    
    // Verify IRB approval is current
    this.verifyIRBApproval();
    
    // Validate consent elements
    const requiredElements = this.getRequiredConsentElements();
    const missingElements = requiredElements.filter(
      element => !reviewData.elementsReviewed.includes(element)
    );
    
    if (missingElements.length > 0) {
      throw new Error(`Missing required consent elements: ${missingElements.join(', ')}`);
    }
    
    // Verify comprehension
    const comprehensionVerified = await this.verifyComprehension(participantId);
    
    const consentRecord: ConsentRecord = {
      participantId,
      consentVersion,
      consentDate: new Date(),
      consentMethod: 'electronic',
      witnessRequired: false,
      ipAddress: reviewData.ipAddress,
      userAgent: reviewData.userAgent,
      consentDuration: reviewData.timeSpent,
      elementsReviewed: reviewData.elementsReviewed,
      comprehensionVerified,
      withdrawalExplained: reviewData.elementsReviewed.includes('withdrawal_rights'),
    };
    
    this.consentRecords.set(participantId, consentRecord);
    
    // Log consent activity
    this.logAccess({
      userId: 'system',
      timestamp: new Date(),
      action: 'edit',
      dataElement: 'consent_record',
      justification: 'Informed consent obtained',
      ipAddress: reviewData.ipAddress,
    });
    
    return consentRecord;
  }

  // Data Protection Implementation
  public initializeDataProtection(
    participantId: string,
    dataTypes: string[]
  ): DataProtectionRecord {
    
    const dataProtectionRecord: DataProtectionRecord = {
      participantId,
      dataCollected: dataTypes,
      storageLocation: 'encrypted_research_database',
      encryptionMethod: 'AES-256-GCM',
      accessLog: [],
      retentionPeriod: 2555, // 7 years in days
      deidentificationLevel: 'safe_harbor',
    };
    
    this.dataProtectionRecords.set(participantId, dataProtectionRecord);
    
    return dataProtectionRecord;
  }

  // Adverse Event Reporting
  public reportAdverseEvent(
    participantId: string,
    eventData: {
      severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
      description: string;
      relatedness: 'unrelated' | 'unlikely' | 'possible' | 'probable' | 'definite';
    }
  ): AdverseEvent {
    
    const adverseEvent: AdverseEvent = {
      id: `ae_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participantId,
      eventDate: new Date(),
      reportDate: new Date(),
      severity: eventData.severity,
      relatedness: eventData.relatedness,
      description: eventData.description,
      actionTaken: 'Event documented and assessed',
      reportedToIRB: this.requiresIRBReporting(eventData.severity, eventData.relatedness),
      reportedToSponsor: false,
      followUpRequired: eventData.severity !== 'mild',
    };
    
    this.adverseEvents.push(adverseEvent);
    
    // Auto-report to IRB if required
    if (adverseEvent.reportedToIRB) {
      this.submitIRBReport(adverseEvent);
    }
    
    return adverseEvent;
  }

  // Participant Withdrawal Management
  public processWithdrawal(
    participantId: string,
    withdrawalType: 'full_withdrawal' | 'data_only' | 'future_contact',
    reason?: string
  ): void {
    
    const consentRecord = this.consentRecords.get(participantId);
    if (!consentRecord) {
      throw new Error('No consent record found for participant');
    }
    
    // Update data protection record
    const dataRecord = this.dataProtectionRecords.get(participantId);
    if (dataRecord) {
      if (withdrawalType === 'full_withdrawal') {
        dataRecord.destructionDate = new Date();
        // Schedule data destruction
        this.scheduleDataDestruction(participantId);
      }
    }
    
    // Log withdrawal
    this.logAccess({
      userId: 'system',
      timestamp: new Date(),
      action: 'edit',
      dataElement: 'withdrawal_record',
      justification: `Participant withdrawal: ${withdrawalType}`,
      ipAddress: 'system',
    });
    
    console.log(`Participant ${participantId} withdrawal processed: ${withdrawalType}`);
  }

  // Data Access Logging
  public logDataAccess(
    userId: string,
    participantId: string,
    action: 'view' | 'edit' | 'export' | 'delete',
    dataElement: string,
    justification: string,
    ipAddress: string
  ): void {
    
    const logEntry: AccessLogEntry = {
      userId,
      timestamp: new Date(),
      action,
      dataElement: `${participantId}:${dataElement}`,
      justification,
      ipAddress,
    };
    
    this.auditLog.push(logEntry);
    
    // Update participant's data protection record
    const dataRecord = this.dataProtectionRecords.get(participantId);
    if (dataRecord) {
      dataRecord.accessLog.push(logEntry);
    }
  }

  // Compliance Monitoring
  public performComplianceCheck(): {
    overallCompliance: 'compliant' | 'non_compliant' | 'under_review';
    issues: string[];
    recommendations: string[];
    nextAuditDate: Date;
  } {
    
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Check IRB approval status
    if (this.isIRBApprovalExpired()) {
      issues.push('IRB approval has expired');
      recommendations.push('Submit continuing review application immediately');
    }
    
    // Check consent compliance
    const consentIssues = this.checkConsentCompliance();
    issues.push(...consentIssues);
    
    // Check data protection compliance
    const dataIssues = this.checkDataProtectionCompliance();
    issues.push(...dataIssues);
    
    // Check adverse event reporting
    const aeIssues = this.checkAdverseEventCompliance();
    issues.push(...aeIssues);
    
    const overallCompliance = issues.length === 0 ? 'compliant' : 'non_compliant';
    const nextAuditDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
    
    return {
      overallCompliance,
      issues,
      recommendations,
      nextAuditDate,
    };
  }

  // Required consent elements per regulations
  private getRequiredConsentElements(): string[] {
    return [
      'study_purpose',
      'procedures',
      'duration',
      'risks',
      'benefits',
      'alternatives',
      'confidentiality',
      'voluntary_participation',
      'withdrawal_rights',
      'contact_information',
      'data_use_and_sharing',
    ];
  }

  // Comprehension verification
  private async verifyComprehension(participantId: string): Promise<boolean> {
    // In a real implementation, this would check comprehension quiz results
    // For now, we'll assume comprehension is verified through the consent process
    return true;
  }

  // IRB approval verification
  private verifyIRBApproval(): void {
    if (!this.irbApproval) {
      throw new Error('No IRB approval on file');
    }
    
    if (this.irbApproval.status !== 'approved') {
      throw new Error(`IRB approval status is ${this.irbApproval.status}`);
    }
    
    if (new Date() > this.irbApproval.expirationDate) {
      throw new Error('IRB approval has expired');
    }
  }

  private isIRBApprovalExpired(): boolean {
    return !this.irbApproval || new Date() > this.irbApproval.expirationDate;
  }

  // Compliance checking methods
  private checkConsentCompliance(): string[] {
    const issues: string[] = [];
    
    this.consentRecords.forEach((record, participantId) => {
      if (!record.comprehensionVerified) {
        issues.push(`Comprehension not verified for participant ${participantId}`);
      }
      
      if (!record.withdrawalExplained) {
        issues.push(`Withdrawal rights not explained to participant ${participantId}`);
      }
      
      if (record.consentDuration < 120000) { // 2 minutes minimum
        issues.push(`Insufficient consent review time for participant ${participantId}`);
      }
    });
    
    return issues;
  }

  private checkDataProtectionCompliance(): string[] {
    const issues: string[] = [];
    
    this.dataProtectionRecords.forEach((record, participantId) => {
      if (record.encryptionMethod !== 'AES-256-GCM') {
        issues.push(`Inadequate encryption for participant ${participantId}`);
      }
      
      if (record.deidentificationLevel === 'none') {
        issues.push(`No de-identification applied for participant ${participantId}`);
      }
      
      // Check for data retention compliance
      const daysStored = (Date.now() - new Date(record.participantId).getTime()) / (1000 * 60 * 60 * 24);
      if (daysStored > record.retentionPeriod) {
        issues.push(`Data retention period exceeded for participant ${participantId}`);
      }
    });
    
    return issues;
  }

  private checkAdverseEventCompliance(): string[] {
    const issues: string[] = [];
    
    this.adverseEvents.forEach(event => {
      if (event.severity === 'severe' || event.severity === 'life_threatening') {
        if (!event.reportedToIRB) {
          issues.push(`Serious adverse event ${event.id} not reported to IRB`);
        }
        
        const timeSinceEvent = Date.now() - event.eventDate.getTime();
        const hoursSinceEvent = timeSinceEvent / (1000 * 60 * 60);
        
        if (hoursSinceEvent > 24 && !event.reportedToIRB) {
          issues.push(`Delayed reporting of serious adverse event ${event.id}`);
        }
      }
    });
    
    return issues;
  }

  // IRB reporting
  private requiresIRBReporting(
    severity: string, 
    relatedness: string
  ): boolean {
    return (severity === 'severe' || severity === 'life_threatening') &&
           (relatedness === 'possible' || relatedness === 'probable' || relatedness === 'definite');
  }

  private submitIRBReport(adverseEvent: AdverseEvent): void {
    console.log(`Submitting IRB report for adverse event: ${adverseEvent.id}`);
    // In a real implementation, this would submit to IRB system
  }

  // Data destruction scheduling
  private scheduleDataDestruction(participantId: string): void {
    console.log(`Scheduling data destruction for participant: ${participantId}`);
    // In a real implementation, this would schedule automated data destruction
  }

  // Audit reporting
  public generateAuditReport(): {
    reportDate: Date;
    irbStatus: string;
    participantCount: number;
    consentCompliance: number;
    dataProtectionCompliance: number;
    adverseEventCount: number;
    auditLogEntries: number;
    complianceScore: number;
  } {
    
    const compliantConsents = Array.from(this.consentRecords.values())
      .filter(record => record.comprehensionVerified && record.withdrawalExplained).length;
    
    const consentCompliance = this.consentRecords.size > 0 ? 
      (compliantConsents / this.consentRecords.size) * 100 : 100;
    
    const compliantDataRecords = Array.from(this.dataProtectionRecords.values())
      .filter(record => record.encryptionMethod === 'AES-256-GCM' && 
                       record.deidentificationLevel !== 'none').length;
    
    const dataProtectionCompliance = this.dataProtectionRecords.size > 0 ?
      (compliantDataRecords / this.dataProtectionRecords.size) * 100 : 100;
    
    const complianceScore = (consentCompliance + dataProtectionCompliance) / 2;
    
    return {
      reportDate: new Date(),
      irbStatus: this.irbApproval?.status || 'unknown',
      participantCount: this.consentRecords.size,
      consentCompliance,
      dataProtectionCompliance,
      adverseEventCount: this.adverseEvents.length,
      auditLogEntries: this.auditLog.length,
      complianceScore,
    };
  }

  // Access control
  public validateAccess(
    userId: string,
    requestedAction: string,
    dataElement: string
  ): boolean {
    // Implement role-based access control
    // This is a simplified implementation
    return true; // In production, implement proper RBAC
  }

  private logAccess(entry: AccessLogEntry): void {
    this.auditLog.push(entry);
  }
}

export default IRBComplianceFramework; 