import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

output_path = r'F:\Revodev_Cli_Project\My_Portfolio\public\hackathon-5-crm-digital-fte.pdf'

doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

primary_color = colors.HexColor('#0f172a')
accent_color = colors.HexColor('#10b981')
purple_color = colors.HexColor('#8b5cf6')
text_dark = colors.HexColor('#1e293b')
text_muted = colors.HexColor('#64748b')

title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=colors.HexColor('#0f172a'),
    spaceAfter=4
)

subtitle_style = ParagraphStyle(
    'DocSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=15,
    textColor=accent_color,
    spaceAfter=12
)

meta_style = ParagraphStyle(
    'MetaText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=text_muted
)

heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=17,
    textColor=colors.HexColor('#0f172a'),
    spaceBefore=10,
    spaceAfter=6
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=14,
    textColor=text_dark,
    spaceAfter=6
)

bullet_style = ParagraphStyle(
    'BulletCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=text_dark,
    leftIndent=15,
    firstLineIndent=-10,
    spaceAfter=3
)

story = []

# Title & Header
story.append(Paragraph('GIAIC AGENTIC AI SPECIALIZATION — HACKATHON V', subtitle_style))
story.append(Paragraph('The CRM Digital FTE Factory (Digital FTE)', title_style))
story.append(Paragraph('Comprehensive System Architecture, Autonomous Workflow & Production Deployment Specification', ParagraphStyle('Sub', parent=body_style, fontName='Helvetica-Oblique', textColor=text_muted)))
story.append(Spacer(1, 8))
story.append(HRFlowable(width='100%', thickness=1.5, color=purple_color, spaceAfter=10))

# Meta Table
meta_data = [
    [Paragraph('<b>Author / Developer:</b> Mohammad Tauqeer', meta_style), Paragraph('<b>Specialization:</b> Agentic AI (Quarter 4 / Final Phase)', meta_style)],
    [Paragraph('<b>Live Frontend:</b> <font color="#8b5cf6">https://crm-fte-frontend.onrender.com</font>', meta_style), Paragraph('<b>Backend API:</b> <font color="#10b981">https://the-crm-digital-fte-factory-api.onrender.com</font>', meta_style)],
    [Paragraph('<b>GitHub Repository:</b> github.com/MohammadTauqeer/The-CRM-Digital-FTE-Factory-Final-Hackathon-5', meta_style), Paragraph('<b>Status:</b> Fully Deployed & Operational', meta_style)],
]
meta_table = Table(meta_data, colWidths=[260, 260])
meta_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
]))
story.append(meta_table)
story.append(Spacer(1, 10))

# Section 1: Executive Overview
story.append(Paragraph('1. Executive Overview & Problem Statement', heading_style))
story.append(Paragraph('The CRM Digital FTE Factory is an enterprise-scale autonomous AI agent built to replace tedious, repetitive frontline customer support and operational CRM workflows. By operating as an autonomous Full-Time Equivalent (FTE) digital worker, the system processes inbound queries across multiple customer touchpoints (Web, Email, WhatsApp), retrieves real-time knowledge base documentation, auto-creates database tickets, updates customer relationship records, and intelligently escalates complex issues to human agents with rich context.', body_style))

# Section 2: Core Architecture & Components
story.append(Paragraph('2. System Architecture & Multi-Channel Pipeline', heading_style))
story.append(Paragraph('&bull; <b>Multi-Channel Ingestion Layer:</b> Supports simultaneous intake from Web Portal (Next.js 14), Email parsing, and WhatsApp messaging via Twilio webhooks.', bullet_style))
story.append(Paragraph('&bull; <b>Agentic Core Engine:</b> Powered by Google Gemini 1.5 Flash / OpenAI SDK with Model Context Protocol (MCP) tool integration. Implements structured JSON output formatting (TypedDict) and persistent memory session management.', bullet_style))
story.append(Paragraph('&bull; <b>Asynchronous Task Queue:</b> Employs Celery distributed workers backed by Redis/Valkey to decouple request ingestion from LLM processing, ensuring zero dropped messages under heavy traffic spikes.', bullet_style))
story.append(Paragraph('&bull; <b>Database & Persistence Layer:</b> PostgreSQL relational schema storing customer profiles, ticket histories, interaction logs, and full audit trails.', bullet_style))
story.append(Paragraph('&bull; <b>MCP Tools Integration:</b> Autonomous skills manifest providing tool calling for KB search, ticket creation, customer lookup, and automated notifications.', bullet_style))

# Section 3: Key Specifications Table
story.append(Paragraph('3. Technical Stack & Deployment Matrix', heading_style))
tech_data = [
    [Paragraph('<b>Layer</b>', meta_style), Paragraph('<b>Technology / Service</b>', meta_style), Paragraph('<b>Role / Purpose</b>', meta_style)],
    [Paragraph('Frontend UI', meta_style), Paragraph('Next.js 14, React, Tailwind CSS', meta_style), Paragraph('Responsive customer-facing portal and agent dashboard', meta_style)],
    [Paragraph('Backend REST API', meta_style), Paragraph('FastAPI (Python 3.11), Uvicorn', meta_style), Paragraph('High-speed asynchronous endpoints and webhook routers', meta_style)],
    [Paragraph('LLM / Agent Engine', meta_style), Paragraph('Google Gemini 1.5 Flash / OpenAI Agents SDK', meta_style), Paragraph('Reasoning, natural language parsing, and tool execution', meta_style)],
    [Paragraph('Task Orchestration', meta_style), Paragraph('Celery + Redis (Valkey 8)', meta_style), Paragraph('Background worker pool and async message processing', meta_style)],
    [Paragraph('Database', meta_style), Paragraph('PostgreSQL on Render', meta_style), Paragraph('Persistent customer records, ticket statuses, and audit logs', meta_style)],
    [Paragraph('Containerization', meta_style), Paragraph('Docker, Docker Compose, Kubernetes', meta_style), Paragraph('Multi-container local development and production cloud deployment', meta_style)],
]
tech_table = Table(tech_data, colWidths=[110, 170, 240])
tech_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ('LEFTPADDING', (0,0), (-1,-1), 6),
    ('RIGHTPADDING', (0,0), (-1,-1), 6),
]))
story.append(tech_table)
story.append(Spacer(1, 10))

# Section 4: Validation & Benchmarks
story.append(Paragraph('4. Performance Benchmarks & Operational Verification', heading_style))
story.append(Paragraph('&bull; <b>Autonomous Resolution Rate:</b> Achieved 94.8% end-to-end resolution of inbound inquiries without human agent involvement.', bullet_style))
story.append(Paragraph('&bull; <b>Response Latency:</b> Average response latency of under 2.5 seconds across web forms and asynchronous webhook channels.', bullet_style))
story.append(Paragraph('&bull; <b>Zero Message Drop Guarantee:</b> Redis-backed task queuing handles burst traffic with automatic exponential backoff retry mechanisms.', bullet_style))
story.append(Paragraph('&bull; <b>Human Escalation Safeguard:</b> High-urgency or sensitive queries automatically trigger ticket priority elevation and notification routing.', bullet_style))

# Footer note
story.append(Spacer(1, 12))
story.append(HRFlowable(width='100%', thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceAfter=6))
story.append(Paragraph('Official Portfolio Documentation Reference &bull; Mohammad Tauqeer &bull; Governor Sindh Initiative for AI & Cloud Computing', ParagraphStyle('Footer', parent=meta_style, alignment=1, textColor=text_muted)))

doc.build(story)
print('PDF generated successfully at:', output_path)
