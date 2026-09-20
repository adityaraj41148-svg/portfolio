import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = r"c:\Users\dell\OneDrive\Desktop\Portfolio\assets\Aditya_Kumar_Resume.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
)

styles = getSampleStyleSheet()

# Custom Colors
PRIMARY = colors.HexColor("#1e293b") # Slate Dark
ACCENT = colors.HexColor("#4f46e5")  # Indigo Accent
TEXT_DARK = colors.HexColor("#0f172a")
TEXT_MUTED = colors.HexColor("#475569")
LINE_COLOR = colors.HexColor("#e2e8f0")

title_style = ParagraphStyle(
    'NameTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=24,
    leading=28,
    textColor=PRIMARY
)

subtitle_style = ParagraphStyle(
    'Subtitle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=11,
    leading=15,
    textColor=ACCENT
)

section_heading = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=16,
    textColor=PRIMARY,
    spaceAfter=6
)

body_style = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_DARK
)

body_muted = ParagraphStyle(
    'BodyMuted',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=9,
    leading=13,
    textColor=TEXT_MUTED
)

story = []

# Header
story.append(Paragraph("ADITYA KUMAR", title_style))
story.append(Spacer(1, 4))
story.append(Paragraph("BCA Student | Aspiring Software Developer | Tech Enthusiast", subtitle_style))
story.append(Spacer(1, 6))

contact_text = "Email: adityakumar.dev@example.com &nbsp;|&nbsp; Location: India &nbsp;|&nbsp; GitHub: github.com/adityakumar &nbsp;|&nbsp; LinkedIn: linkedin.com/in/adityakumar"
story.append(Paragraph(contact_text, body_muted))
story.append(Spacer(1, 10))
story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=0, spaceAfter=12))

# Executive Summary
story.append(Paragraph("PROFILE SUMMARY", section_heading))
summary_p = ("Enthusiastic and results-driven Bachelor of Computer Applications (BCA) student with a strong passion "
             "for software development, web engineering, cybersecurity, and modern programming paradigms. Proficient in "
             "building clean, user-centric web applications and system-level applications using C++, JavaScript, HTML5, CSS3, and SQL.")
story.append(Paragraph(summary_p, body_style))
story.append(Spacer(1, 12))

# Education
story.append(Paragraph("EDUCATION", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceBefore=0, spaceAfter=8))

edu_data = [
    [Paragraph("<b>Bachelor of Computer Applications (BCA)</b>", body_style), Paragraph("Pursuing", body_muted)],
    [Paragraph("Amritsar Group of Colleges", body_muted), Paragraph("", body_style)],
    [Paragraph("<b>Senior Secondary (12th)</b>", body_style), Paragraph("2024", body_muted)],
    [Paragraph("<b>Matriculation (10th)</b>", body_style), Paragraph("2020", body_muted)]
]
t_edu = Table(edu_data, colWidths=[400, 130])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
]))
story.append(t_edu)
story.append(Spacer(1, 12))

# Technical Skills
story.append(Paragraph("TECHNICAL SKILLS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceBefore=0, spaceAfter=8))

skills_data = [
    [Paragraph("<b>Programming Languages:</b>", body_style), Paragraph("C, C++, Python, JavaScript (ES6+)", body_style)],
    [Paragraph("<b>Web Technologies:</b>", body_style), Paragraph("HTML5, CSS3, Bootstrap, React.js, Responsive Web Design", body_style)],
    [Paragraph("<b>Database Systems:</b>", body_style), Paragraph("MySQL, DBMS, SQL, PL/SQL", body_style)],
    [Paragraph("<b>Developer Tools & Utilities:</b>", body_style), Paragraph("Git, GitHub, VS Code, MS Excel, PowerPoint, Photoshop, CorelDRAW, Canva", body_style)]
]
t_skills = Table(skills_data, colWidths=[150, 380])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))
story.append(t_skills)
story.append(Spacer(1, 12))

# Featured Projects
story.append(Paragraph("FEATURED PROJECTS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceBefore=0, spaceAfter=8))

projects = [
    ("Weather Application", "HTML, CSS, JavaScript", "Designed and built a responsive weather application delivering real-time weather analytics and interactive weekly forecasts through an intuitive user interface."),
    ("Personal Portfolio Website", "HTML, CSS, JavaScript", "Engineered a high-performance, dark-themed personal portfolio with smooth scroll animations, active section detection, modal breakdowns, and responsive design."),
    ("Amazon Clone", "HTML, CSS, JavaScript", "Developed a modern e-commerce web platform featuring product catalog displays, clean grid layouts, and interactive navigation elements."),
    ("Bank Management System", "C++", "Built a robust console application implementing core banking operations such as account creation, deposits, withdrawals, and balance inquiries using C++ OOP concepts."),
    ("Hostel Management System", "C++", "Constructed a console-based data management application for managing room allocations and student records efficiently with file I/O operations.")
]

for title, tech, desc in projects:
    p_header = f"<b>{title}</b> &nbsp;<font color='#4f46e5'>[{tech}]</font>"
    story.append(Paragraph(p_header, body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(desc, body_style))
    story.append(Spacer(1, 6))

story.append(Spacer(1, 6))

# Responsibilities & Activities
story.append(Paragraph("ACTIVITIES & RESPONSIBILITIES", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceBefore=0, spaceAfter=8))

story.append(Paragraph("<b>Placement Committee Member / Student Coordinator</b> &nbsp;|&nbsp; Placement Cell", body_style))
story.append(Paragraph("Active member of the college placement cell, contributing to event coordination, student-recruiter drive management, and campus placement activities.", body_style))

doc.build(story)
print(f"Generated PDF Resume at {pdf_path}")
