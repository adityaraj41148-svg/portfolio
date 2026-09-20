import os
from PIL import Image, ImageDraw, ImageFont

def create_mockup(filename, title, subtitle, tags, theme_color, bg_gradient_start, bg_gradient_end, type_style="web"):
    width, height = 1280, 720
    img = Image.new("RGB", (width, height), bg_gradient_start)
    draw = ImageDraw.Draw(img)

    # Draw smooth gradient background
    for y in range(height):
        r = int(bg_gradient_start[0] + (bg_gradient_end[0] - bg_gradient_start[0]) * (y / height))
        g = int(bg_gradient_start[1] + (bg_gradient_end[1] - bg_gradient_start[1]) * (y / height))
        b = int(bg_gradient_start[2] + (bg_gradient_end[2] - bg_gradient_start[2]) * (y / height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Grid background pattern
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 10), width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=(255, 255, 255, 10), width=1)

    # Window container
    wx1, wy1, wx2, wy2 = 100, 80, width - 100, height - 80
    # Outer glow / shadow
    draw.rounded_rectangle([wx1-4, wy1-4, wx2+4, wy2+4], radius=24, fill=(theme_color[0], theme_color[1], theme_color[2], 40))
    # Window body
    draw.rounded_rectangle([wx1, wy1, wx2, wy2], radius=20, fill=(18, 22, 34))

    # Window header bar
    draw.rounded_rectangle([wx1, wy1, wx2, wy1 + 50], radius=20, fill=(26, 32, 48))
    draw.rectangle([wx1, wy1 + 30, wx2, wy1 + 50], fill=(26, 32, 48))

    # Window controls (red, yellow, green dots)
    draw.ellipse([wx1 + 25, wy1 + 18, wx1 + 39, wy1 + 32], fill=(255, 95, 86))
    draw.ellipse([wx1 + 47, wy1 + 18, wx1 + 61, wy1 + 32], fill=(255, 189, 46))
    draw.ellipse([wx1 + 69, wy1 + 18, wx1 + 83, wy1 + 32], fill=(39, 201, 63))

    # URL / Title Bar in center of header
    draw.rounded_rectangle([wx1 + 180, wy1 + 12, wx2 - 180, wy1 + 38], radius=8, fill=(13, 17, 26))
    draw.text((wx1 + 200, wy1 + 16), f"localhost:3000/{title.lower().replace(' ', '-')}", fill=(140, 160, 190))

    # Content section inside window
    cy1 = wy1 + 70
    
    if type_style == "web":
        # Draw header inside mockup app
        draw.text((wx1 + 50, cy1 + 20), title, fill=(255, 255, 255))
        draw.text((wx1 + 50, cy1 + 60), subtitle, fill=(160, 174, 192))

        # Hero/Card boxes inside mockup
        # Left main card
        draw.rounded_rectangle([wx1 + 50, cy1 + 110, wx1 + 620, wy2 - 40], radius=16, fill=(25, 33, 50))
        draw.text((wx1 + 80, cy1 + 140), "Featured Application Interface", fill=theme_color)
        draw.text((wx1 + 80, cy1 + 180), "Live Responsive Dashboard & UI Components", fill=(200, 210, 225))
        
        # Action button
        draw.rounded_rectangle([wx1 + 80, cy1 + 230, wx1 + 240, cy1 + 275], radius=10, fill=theme_color)
        draw.text((wx1 + 115, cy1 + 243), "Explore Demo", fill=(10, 15, 26))

        # Mini stats cards
        draw.rounded_rectangle([wx1 + 80, cy1 + 300, wx1 + 320, cy1 + 380], radius=12, fill=(35, 45, 66))
        draw.text((wx1 + 100, cy1 + 320), "Active Users", fill=(140, 160, 190))
        draw.text((wx1 + 100, cy1 + 345), "1,240+", fill=(255, 255, 255))

        draw.rounded_rectangle([wx1 + 350, cy1 + 300, wx1 + 590, cy1 + 380], radius=12, fill=(35, 45, 66))
        draw.text((wx1 + 370, cy1 + 320), "System Status", fill=(140, 160, 190))
        draw.text((wx1 + 370, cy1 + 345), "99.9% Operational", fill=(72, 187, 120))

        # Right code preview panel
        draw.rounded_rectangle([wx1 + 650, cy1 + 110, wx2 - 50, wy2 - 40], radius=16, fill=(13, 17, 26))
        draw.text((wx1 + 675, cy1 + 130), "// Core Technology Stack", fill=(113, 128, 150))
        
        tx = wx1 + 675
        ty = cy1 + 170
        for tag in tags:
            draw.rounded_rectangle([tx, ty, tx + 160, ty + 36], radius=18, fill=(28, 38, 58))
            draw.text((tx + 20, ty + 10), f"# {tag}", fill=theme_color)
            ty += 48
            if ty > wy2 - 100:
                break

    else: # Terminal / C++ console application style
        # Terminal prompt header
        draw.text((wx1 + 50, cy1 + 20), f"[C++ System CLI] - {title}", fill=theme_color)
        
        # Code / Terminal Output box
        draw.rounded_rectangle([wx1 + 50, cy1 + 60, wx2 - 50, wy2 - 40], radius=16, fill=(10, 14, 23))
        
        lines = [
            ("aditya@dev-pc:~$ ", (72, 187, 120)),
            (f"./bin/{title.lower().replace(' ', '_')}", (255, 255, 255)),
            ("==================================================", (80, 95, 120)),
            (f"  SYSTEM STATUS: INITIALIZED & READY", (255, 215, 0)),
            (f"  MODULE: {subtitle}", (200, 210, 225)),
            ("==================================================", (80, 95, 120)),
            ("[1] Create New Account / Register Student Record", (140, 180, 255)),
            ("[2] Deposit / Withdraw / Room Allocation Matrix", (140, 180, 255)),
            ("[3] Query Database Record & Generate Audit Logs", (140, 180, 255)),
            ("[4] Backup Data Structures & Memory Dump", (140, 180, 255)),
            ("--------------------------------------------------", (80, 95, 120)),
            ("Select option [1-4]> 1", (72, 187, 120)),
            ("SUCCESS: Transaction committed to encrypted storage.", (56, 178, 172))
        ]

        ty = cy1 + 90
        for text, col in lines:
            draw.text((wx1 + 80, ty), text, fill=col)
            ty += 28

    # Save image
    out_path = os.path.join(r"c:\Users\dell\OneDrive\Desktop\Portfolio\assets\images", filename)
    img.save(out_path, quality=95)
    print(f"Generated {filename}")

os.makedirs(r"c:\Users\dell\OneDrive\Desktop\Portfolio\assets\images", exist_ok=True)

create_mockup(
    "portfolio-site.jpg", 
    "Personal Portfolio Website", 
    "Modern Developer Portfolio & Interactive Showcase", 
    ["HTML5", "CSS3", "JavaScript", "Responsive UI"], 
    (129, 140, 248), # Soft Purple/Indigo accent
    (15, 23, 42), (30, 27, 75),
    type_style="web"
)

create_mockup(
    "amazon-clone.jpg", 
    "Amazon E-Commerce Clone", 
    "Full-featured E-Commerce Frontend Platform", 
    ["HTML5", "CSS3", "JavaScript", "E-Commerce"], 
    (245, 158, 11), # Amber/Orange accent
    (15, 23, 42), (67, 20, 7),
    type_style="web"
)

create_mockup(
    "bank-system.jpg", 
    "Bank Management System", 
    "High-Performance Console Banking Software", 
    ["C++", "OOP", "File I/O", "Data Structures"], 
    (16, 185, 129), # Emerald Green accent
    (15, 23, 42), (6, 78, 59),
    type_style="terminal"
)

create_mockup(
    "hostel-system.jpg", 
    "Hostel Management System", 
    "Automated Hostel Allocations & Record System", 
    ["C++", "Data Mgmt", "CLI", "File Handling"], 
    (14, 165, 233), # Sky Blue accent
    (15, 23, 42), (12, 74, 110),
    type_style="terminal"
)
