import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Hero Content
content = content.replace('<div class="hero-content">', '<div class="hero-content" data-aos="fade-up">')

# Scribbles
content = content.replace('<div class="scribble scr1">', '<div class="scribble scr1" data-aos="fade-up" data-aos-delay="400">')
content = content.replace('<div class="scribble scr2">', '<div class="scribble scr2" data-aos="fade-up" data-aos-delay="600">')

# Start Head
content = content.replace('<div class="start-head">', '<div class="start-head" data-aos="fade-up">')

# Path Grid items
content = re.sub(r'<a class="path"(.*?)>', r'<a class="path"\1 data-aos="fade-up">', content)

# Dest Left and Cards
content = content.replace('<div class="dest-left">', '<div class="dest-left" data-aos="fade-right">')
content = content.replace('<div class="dest-cards">', '<div class="dest-cards" data-aos="fade-left">')

# Community Grid
content = content.replace('<div class="community-grid">', '<div class="community-grid" data-aos="fade-up">')

# Story Grid
content = content.replace('<div class="story-grid">', '<div class="story-grid" data-aos="fade-up">')

# Socials
content = content.replace('<section class="socials">', '<section class="socials" data-aos="fade-up">')

# Social Links
content = re.sub(r'<a href="#" class="social-link">', r'<a href="#" class="social-link" data-aos="zoom-in">', content)

# CTA Footer
content = content.replace('<footer class="cta">', '<footer class="cta" data-aos="fade-up">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('AOS attributes added successfully.')
