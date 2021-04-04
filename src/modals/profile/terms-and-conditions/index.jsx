import React, { Fragment } from "react";

// COMPONENTS
import { Grid, Table } from "semantic-ui-react";
import TextControl from "../../../components/controls/text-control";
import TableControl from "../../../components/controls/table-control";
import ModalControl from "../../../components/controls/modal-control";
import ButtonControl from "../../../components/controls/button-control";
import TableCellControl from "../../../components/controls/table-cell-control";

// DATA
import { LOGIN_TERMS_AND_CONDITIONS_HEADERS } from "../../../data/login";

// UTILS
import PropTypes from "prop-types";

const TermsAndConditions = ({ visible, handleClose }) => {
    // FUNCTIONS
    const handleActions = () => {
        return (
            <Fragment>
                <ButtonControl basic color="grey" name="close" text="Close" onClick={handleClose} />
            </Fragment>
        );
    };

    return (
        <ModalControl
            customed
            name="terms"
            scrolling={true}
            centered={false}
            visible={visible}
            handleClose={handleClose}
            title="Terms & Conditions"
            actionButtons={handleActions()}
        >
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <TextControl>
                            Telemedicine is an electronic communication channel that extends primary
                            healthcare services to Maxicare members such as consultation and other
                            health advice offered by Maxicare Healthcare Corporation (“Maxicare”)
                            through its affiliated and accredited doctors & healthcare providers
                            (“Provider”). Electronic and communications technologies such as phone
                            call, chat or short messaging service (SMS), and audio- and
                            video-conferencing are used to deliver healthcare at a distance between
                            a patient at an originating site, and a physician at a distant site.”
                        </TextControl>

                        <TextControl>
                            The Terms and Conditions contained herein form part of the Agreements
                            between you as a Provider and Maxicare. We therefore advise you to
                            please review these terms and conditions carefully and indicate whether
                            you agree or disagree with them by clicking on the corresponding box
                            towards the end of this document. Maxicare reserves the right to modify
                            these Terms and Conditions from time to time.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            1. By registering in Telemedicine consultation as a Telemedicine
                            provider, you acknowledge and agree to abide by all the terms and
                            conditions contained herein, in the Physician Affiliation Agreement and
                            in any other relevant agreement (the <b>“Agreements”</b>) executed
                            between you and Maxicare, including but not limited to, the privacy and
                            security policies, medical and handling protocols, and reporting rules,
                            which are hereby incorporated by reference, subject to changes and
                            notices by Maxicare. Your signature may no longer be required to
                            manifest your consent herein. All other provisions of the Agreements
                            which are not inconsistent to these Terms and Conditions are deemed
                            applicable and incorporated. In case any conflict arises between the
                            provisions of the Agreements and these Terms and Conditions, the Terms
                            and Conditions shall govern in so far as the conflict involves
                            Teleconsultation.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            2. <b>Proficiencies and Competencies.</b> In addition, by registering in
                            Telemedicine as a Telemedicine provider, you represent that you have the
                            following competencies and equipment:
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            a. Proficiency in digital communication skills, clinical acumen,
                            capacity to perform virtual physical exams using remote examination
                            techniques and/or remote monitoring devices, and knowledge of technology
                            and equipment to be used, while adhering to ethical practice;
                        </TextControl>
                        <TextControl indented indentLevel={4}>
                            b. Communication device such as a landline phone, cellular phone with or
                            without camera, and/or computer with or without webcamera will be
                            required. If using an online video or messaging software or application,
                            a stable internet connection is required. A private, well-lit location
                            is preferred, especially for video consult.
                        </TextControl>
                        <TextControl indented indentLevel={4}>
                            c. Measures to ensure privacy of the teleconsult so as to prevent anyone
                            from overhearing, wire-tapping and/or recording any privileged
                            communication without the consent of the Member
                        </TextControl>
                        <TextControl indented indentLevel={4}>
                            d. Maxicare shall not be liable to provide technical assistance or
                            troubleshooting services in case of any errors encountered during the
                            actual teleconsultation service with the Member. Any technical
                            difficulties should be addressed by you.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            3. <b>Referrals to Maxicare Primary Care Centers.</b> You hereby agree
                            and understand that in the event that as a Telemedicine provider, you
                            determine that there is a medical necessity for a Member to undergo
                            certain laboratory, clinic, diagnostic or pharmaceutical tests,
                            procedures and/or services, and you prescribed the conduct of the said
                            tests, procedures and/or services, you shall refer the said Member to
                            the Maxicare Primary Care Centers for the performance of such tests,
                            procedures and/or services. Only in cases where the prescribed tests,
                            procedures and/or services are not available in the Maxicare Primary
                            Care Centers (PCC) and/or there is no PCC available in the area shall
                            referral to other clinics or laboratories be allowed. In no event will
                            you require the Member to retake previously prescribed and taken tests,
                            procedures and/or services based on the sole reason that said tests,
                            procedures and/or services were performed in a Maxicare Primary Care
                            Center.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            4. <b>Document Retention.</b> You hereby agree and understand that you
                            shall retain the original hard copies of the billing statements,
                            official receipts, supporting documents, medical notes and other
                            documents related to the services rendered to Maxicare and its Members
                            for a period of ten (10) years from submission of the scanned copies of
                            the said documents to Maxicare. Upon prior written notice, Maxicare and
                            its duly authorized representatives shall be given the right to examine
                            the said documents and to ask for copies thereof as occasion demands.
                            You, upon request of Maxicare, shall transmit the requested documents
                            within fifteen (15) days from receipt of notice. The expenses for the
                            reproduction of the Billing Statements and Supporting Documents shall be
                            for your account.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            5. <b>Provider Relations Services.</b> You hereby agree and understand
                            that in the course of your affiliation as a Telemedicine provider,
                            Maxicare shall continue to develop and fine tune the telemedicine
                            services provided to its Members. As such, Maxicare and/or its
                            representatives, agents, and third party providers, may from time to
                            time issue new policies, notices, campaigns, programs, applications
                            and/or software for the Provider’s use and compliance. As such, you
                            hereby agree that you shall abide by the said new policies, notices,
                            campaigns, and/or use the said new programs, applications and/or
                            software. The said policies, notices, campaigns, programs, applications
                            and/or software shall be limited to Telemedicine, e-Health and
                            electronic claims and settlement.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            6. <b>Representations and Warranties.</b> All your representations,
                            warranties and undertakings such as but not limited to your
                            qualifications and credentials shall be deemed to be material and have
                            been relied upon by Maxicare. Consequently, you shall be directly and
                            solely responsible for the accuracy of any and all information that you
                            submit to Maxicare. They shall survive the execution and delivery of
                            these Terms and Conditions, notwithstanding the consummation of the
                            transaction contemplated herein.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            7. <b>Authority to Process.</b> You agree and understand that by
                            registering in Telemedicine as a Telemedicine provider, and as part of
                            your obligations in the Agreements executed between you and Maxicare,
                            Maxicare shall engage the services of, and/or interact with, third
                            parties, such as, but not limited to its parent company, affiliated
                            companies, subsidiaries, financial advisors, affiliated third parties or
                            independent/non-affiliated third parties and service providers, whether
                            local or foreign (collectively referred to as
                            &quot;Representatives&quot;). In connection with the foregoing, you
                            hereby irrevocably authorize Maxicare and its Representatives, as
                            processor of your personal information, to be your attorney-in-fact to:
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            e. Obtain, collect, examine, process, store and share your personal
                            information, including sensitive personal information and privileged
                            information such as but not limited to full name, gender, birthday,
                            email address, mobile number, Professional Regulation Commission (PRC)
                            number, specialization and subspecialization, VAT status, Tax
                            Identification Number (TIN), bank name (for those enrolled in
                            auto-credit arrangement mode of payment), bank account number, mode of
                            Telemedicine and practice schedule (including day and time), or any
                            other information that is necessary for you to comply with your
                            obligations in the Agreements, as may be deemed necessary by Maxicare.
                            Except as otherwise stated hereon, any information obtained relative to
                            the authority herein given shall be strictly confidential. The extent of
                            the collection and processing shall be necessary and incidental to the
                            performance of your obligation under the Agreements.
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            f. Disclose the aforementioned information and/or recording to Maxicare,
                            its Clients, Representatives and Members, for any legitimate business
                            purpose as Maxicare may deem appropriate and as necessary to comply with
                            your obligations in the Agreements.
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            g. Post or otherwise make public your relevant information which shall
                            include but not limited to; (1) complete name, (2) specialization, (3)
                            clinic schedule, (4) contact information, (5) messaging account handles,
                            and (6) social media information to Maxicare’s Member Gateway systems,
                            MaxiHealth app, and other Maxicare systems or partner eHealth platforms.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            Processing is hereby understood to include any operation or any set of
                            operations performed upon personal information including, but not
                            limited to, the collection, recording, organization, storage, updating
                            or modification, retrieval, consultation, use, consolidation, blocking,
                            erasure or destruction of data. Processing would include both manual and
                            automated handling of personal information and storage and data
                            transfers using various means including but not limited to physical
                            methods as well as electronic via information and communications systems
                            employed by Maxicare and its Representatives.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            You retain the right to be informed, to object, access, complain, and
                            rectify, to request for filtering of certain information, and to the
                            corresponding damages in case of violation of your rights within the
                            corresponding limitations as set forth under the pertinent laws.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            8. <b>Data Sharing.</b> During the course of your engagement as a
                            Telemedicine provider, you and Maxicare recognize that sharing and
                            processing of personal information collected from you or by you from
                            data subjects such as Maxicare Members is necessary and desirable in the
                            performance of your obligations as a Telemedicine provider and to
                            Maxicare’s conduct of business.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            9. The Data collected, processed and shared pursuant to this Terms and
                            Conditions, and the Agreements shall be processed and shared exclusively
                            for the purposes of the services contemplated in this Terms and
                            Conditions, and the Agreements, while maintaining compliance with Data
                            Privacy Acts, its implementing rules and regulations and other issuances
                            of relevant government agencies such as National Privacy Commission,
                            Department of Health and the Insurance Commission.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            10. The following information may be shared to the following
                            individuals/entities as broken down below:
                        </TextControl>

                        <TableControl
                            fixed
                            singleLine={false}
                            headers={LOGIN_TERMS_AND_CONDITIONS_HEADERS}
                        >
                            <Table.Body>
                                <Table.Row>
                                    <TableCellControl content="Patient Registration Information Existing Medical Notes or SOAP Orders or Availment (LOA) Order for Patients and Results thereof" />
                                    <TableCellControl content="Maxicare" />
                                    <TableCellControl content="Provider" />
                                </Table.Row>
                                <Table.Row>
                                    <TableCellControl content="Telemed Provider practice Contact Details, Schedule of consultation, messaging and social media accounts/platforms" />
                                    <TableCellControl content="Telemedicine Provider" />
                                    <TableCellControl content="Members" />
                                </Table.Row>
                                <Table.Row>
                                    <TableCellControl content="TeleMed Interaction Notes, Electronic Health Records or Manual Medical Notes or SOAP" />
                                    <TableCellControl content="Telemedicine Provider" />
                                    <TableCellControl content="Maxicare" />
                                </Table.Row>
                            </Table.Body>
                        </TableControl>

                        <TextControl indented indentLevel={2}>
                            11. As a Data Processor/Controller, you hereby represent and warrant
                            that:
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            a. You shall implement reasonable and appropriate organizational,
                            physical and technical measures intended for the protection of Personal
                            Information [and/or Sensitive Personal Information] against (i) any
                            accidental or unlawful destruction, alteration and disclosure, as well
                            as against any other unlawful processing, and (ii) natural dangers such
                            as accidental loss or destruction, and human dangers such as unlawful
                            access, fraudulent misuse, unlawful destruction, alteration and
                            contamination
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            b. Your employees, agents or representatives who are involved in the
                            processing of Personal Information [and/or Sensitive Personal
                            Information] shall operate and hold the Data under strict
                            confidentiality if the Data is not intended for public disclosure. This
                            obligation shall continue even after transfer to another position or
                            upon termination of employment or contractual relations
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            c. You shall ensure that its employees do not retain any Information for
                            longer than is necessary for the Purpose stated under this Agreement or
                            as required or permitted by the Data Privacy Laws or internal document
                            retention policies. Furthermore, Parties shall ensure that its employees
                            do not transfer or share the Information to any other person or entity
                            that is not previously authorized under this Agreement.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            12. <b>Security Breach.</b> When you know or reasonably suspect that an
                            Information Security Breach has affected the Information or the
                            Information provided by Maxicare or the Member while you are processing
                            such data, you shall promptly notify Maxicare [in any case within the
                            later of 24 hours or one (1) calendar day following such discovery] and
                            cooperate with Maxicare in any post-breach/incident investigation,
                            notification requirement, or remediation efforts. The notification
                            shall, at the minimum, describe the nature of the breach or incident,
                            effects thereof, the Information possibly involved and the measures
                            taken by the entity to address the incident or remediate the breach. It
                            shall also include measures taken to reduce the harm or negative
                            consequences of the breach or the security incident.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            You may contact our Data Privacy Officer thru the following contact
                            details:
                        </TextControl>

                        <TextControl indented indentLevel={6}>
                            Data Protection Officer : Mr. Jose Michael Tagle, CISM, DPO[TuV]
                            <br />
                            Telephone no: (02) 8908-6989
                            <br />
                            Email address: dpo@maxicare.com.ph
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            13. In accordance with your obligations in the Agreements executed
                            between you and Maxicare, the authorities herein provided shall be valid
                            and existing during the term of such Agreements, including any
                            extensions thereof, and until necessary for the establishment, exercise
                            or defense of any claims arising from the said Agreements.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            14. <b>Data Privacy Rights.</b> You hereby warrant that you understand
                            your rights and obligations pursuant to the Data Privacy Act and its
                            implementing rules and regulations. Consequently, you hereby agree to
                            hold Maxicare and its Representatives free and harmless from and against
                            any and all suits or claims, actions, or proceedings, damages, costs,
                            and expenses, including attorney&apos;s fees, which may be filed,
                            charged, or adjudged against Maxicare or any of its directors,
                            stockholders, officers, employees, agents, or its Representatives in
                            connection with or arising from the use, processing and disclosure by
                            Maxicare or its Representatives of the aforementioned information
                            pursuant to Maxicare’s reliance on your consent that Maxicare and its
                            Representatives have the authority to examine, use, process, store or
                            disclose, as the case may be, said information for the purposes
                            above-mentioned.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            15. <b>Confidentiality.</b> You, including your employees, agents or
                            representatives shall not use or reproduce, directly or indirectly any
                            Confidential Information for the benefit of any person, or disclose to
                            anyone such Confidential Information without the written authorization
                            from Maxicare’s duly authorized officer, whether during or after the
                            term of these Terms and Conditions and the Agreements.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            “Confidential Information” means any data or information, that is
                            proprietary to Maxicare and not generally known to the public, provided
                            before or after, whether tangible or intangible form, whenever and
                            however disclosed, including, without limitation, (a) personal
                            information about patients, treatments or operations undergone, (b)
                            trade secrets, confidential or secret formulae, special medical
                            equipment and procedures, (c) medical utilization reports, directly or
                            indirectly useful in any aspect of the business of Maxicare, (d) any
                            vendor names, patient and supplier lists, (e) marketing strategies,
                            plans, financial information, or projections, operations, sales
                            estimates, business plans and performance results relating to the past,
                            present or future business activities of Maxicare, (f) all intellectual
                            or other proprietary information or material of Maxicare; (g) all forms
                            of the Confidential Information including, but not limited to, loose
                            notes, diaries, memoranda, drawings, photographs, electronic storage and
                            computer printouts; (h) any other information that should reasonably be
                            recognized as Confidential Information of Maxicare. All information
                            which Provider and/or its representatives acquire or become acquainted
                            with during the period of the Agreements, whether developed by them or
                            by others, which Provider has a reasonable basis to believe to be
                            Confidential Information, or which is treated, designated and/or
                            identified by Maxicare as such, shall be deemed to be Confidential
                            Information. Confidential Information need not be novel, unique,
                            patentable, copyrightable or constitute a trade secret in order to be
                            designated as such.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            Anything herein to the contrary, notwithstanding, Confidential
                            Information shall not include information which: (a) was known by
                            Provider prior to receiving the Confidential Information from the
                            disclosing party; (b) becomes rightfully known to the Provider from a
                            third-party source not known after diligent inquiry by the Provider to
                            be under an obligation to the disclosing party to maintain
                            confidentiality; (c) is or becomes publicly available through no fault
                            of or failure to act by the Provider in breach of the Agreements; (d) is
                            required to be disclosed by law or regulation or in any judicial or
                            administrative proceeding provided, however, that: (i) Provider has
                            provided Maxicare with prompt written notice thereof so that the
                            disclosing party may seek appropriate remedy and/or injunctive relief
                            prior to such disclosure by the Provider, (ii) Provider has taken all
                            reasonable actions and/or steps to resist or narrow down the information
                            to be disclosed; (iii) should partial disclosure be required, the
                            Provider furnishes only that portion that is legally required to be
                            disclosed; and (iv) Provider shall not oppose and shall cooperate with
                            Maxicare with respect to any such request for any protective order or
                            other relief; (e) is or has been independently developed by employees,
                            consultants or agents of the receiving party without violation of the
                            terms of this agreement or reference or access to any Confidential
                            Information; and (f) is disclosed with Maxicare’s prior written consent.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            16. You agree that all Confidential Information shall remain the
                            exclusive property of Maxicare and its successors.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            17. In the event that you disclose, disseminate or release any
                            Confidential Information received from Maxicare, except as may be
                            permitted above, such disclosure, dissemination or release will be
                            deemed a material breach of these Terms and Conditions and the
                            Agreements. The obligations imposed herein shall survive even after the
                            termination of these Terms and Conditions and the Agreements.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            18. <b>Liabilities and Indemnification.</b> Maxicare shall not be liable
                            for any loss or damage of whatever nature in connection with the
                            implementation of transactions covered by these Terms and Conditions in
                            the following instances:
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            d. Disruption, failure or delay which are due to circumstances beyond
                            the control of Maxicare, fortuitous events such as but not limited to
                            prolonged power outages, breakdown in computers and communication
                            facilities, typhoons, public disturbances and calamities, and other
                            similar or related cases;
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            e. Loss or damage you may suffer due to theft or unauthorized use of
                            your passwords, personal data, or violation of other security measures
                            with or without your participation; and
                        </TextControl>

                        <TextControl indented indentLevel={4}>
                            f. Inaccurate, incomplete or delayed information you received due to
                            disruption or failure of any communication facilities.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            19. Maxicare shall not be liable for any loss, liability, damage or
                            expense arising out of or in connection with the use of Teleconsult,
                            unless such loss, liability, damage or expense shall be proven to result
                            directly from the gross and willful misconduct of Maxicare or its
                            Representatives. In no event will Maxicare be liable for special,
                            indirect, punitive or consequential damages. Under no circumstances will
                            the liability of Maxicare exceed, in the aggregate, the fees actually
                            paid pursuant to the Agreements.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            20. <b>Intellectual Property.</b> Maxicare and its Representatives shall
                            retain all rights in any software user and system documentation, master
                            and transaction data files, ideas, concepts, know-how, processes,
                            development tools, techniques or any other proprietary material or
                            information related to Teleconsult.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            21. <b>Governing Law and Venue of Suit.</b> The Terms and Conditions
                            contained herein are governed by the laws of the Philippines and all
                            suits to enforce these Terms and Conditions and the Agreements between
                            you and Maxicare or its Representatives shall be brought exclusively in
                            the proper courts of Makati City.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            22. <b>Breach.</b> In case of breach of any of the provisions of these
                            Terms and Conditions, the Agreements, as well as the warranties and
                            representations stated herein, Maxicare shall be entitled to the amount
                            of Two Hundred Thousand Pesos (P200,000.00) as minimum damages, in
                            addition to any other damages which it may be entitled under the law,
                            and attorney&apos;s fees in the amount of One Hundred Thousand Pesos
                            (P100,000.00) in the event that it shall be constrained to engage the
                            services of counsel to prosecute its claim. In addition, Maxicare may,
                            at its option, disaffiliate you as a provider in general or specifically
                            as a telemedicine provider. Resorting to a remedy described herein does
                            not preclude Maxicare from exercising any other rights granted in this
                            Terms and Conditions, Agreements and applicable law.
                        </TextControl>

                        <TextControl indented indentLevel={2}>
                            23. Maxicare reserves the right to amend the Telemedicine Terms and
                            Conditions at any time without the need of prior notice or approval. You
                            may access https://www.maxicare.com.ph/telemed-terms for the latest
                            version of the Telemedicine Terms and Conditions and any queries related
                            thereto may be addressed to dpo@maxicare.com.ph .
                        </TextControl>

                        <TextControl>
                            I have read and fully understood these Terms and Conditions and hereby
                            agree to be governed thereby.
                        </TextControl>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ModalControl>
    );
};

export default TermsAndConditions;

TermsAndConditions.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.object,
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
};

TermsAndConditions.defaultProps = {
    modalData: {},
    visible: false,
    handleClose: () => {},
    handleAccept: () => {},
};
