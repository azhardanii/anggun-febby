/**
 * ANGGUN FEBBY — SIGNATURE INTERACTION & MOTION SCRIPTS
 * Auto-unmute reels, 3D Tilt, Live Destination Filter, Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Initialize AOS Smooth Motion Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      disable: window.innerWidth < 768 ? 'mobile' : false
    });
  }

  // 2. Floating Navbar Scroll State
  const navWrap = document.querySelector('.nav-wrap');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navWrap?.classList.add('nav-scrolled');
    } else {
      navWrap?.classList.remove('nav-scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      mobileDrawer.classList.toggle('active');
    });

    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 4. Back to Top Button Smooth Scroll
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. 3D Card Tilt Effect on Mouse Move
  const tiltCards = document.querySelectorAll('.path-card, .dest-card, .tools-bento, .lynkid-bento, .database-bento');
  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      if (window.innerWidth < 1024) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  // 6. Destination Search & Popular Filter Chips
  const destSearchInput = document.getElementById('dest-search-box');
  const destChips = document.querySelectorAll('.dest-chip');
  const destCards = document.querySelectorAll('.dest-card');

  function filterDestCards() {
    const activeChip = document.querySelector('.dest-chip.active')?.getAttribute('data-filter') || 'all';
    const query = (destSearchInput?.value || '').toLowerCase().trim();

    destCards.forEach(function (card) {
      const city = (card.getAttribute('data-city') || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchesChip = (activeChip === 'all' || city.includes(activeChip));
      const matchesQuery = !query || text.includes(query);

      if (matchesChip && matchesQuery) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (destChips) {
    destChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        destChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterDestCards();
      });
    });
  }

  if (destSearchInput) {
    destSearchInput.addEventListener('input', filterDestCards);
  }

  // 7. Video Reels Player (AUTO SOUND ON CLICK PLAY, MUTE ON PAUSE)
  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach(function (card) {
    const video = card.querySelector('.story-video');
    const soundStatus = card.querySelector('.sound-toggle-status');
    const soundHint = card.querySelector('.story-sound-hint');
    if (!video) return;

    card.addEventListener('click', function (e) {
      if (e.target.closest('.ig-badge')) return;

      if (video.paused) {
        // Pause and mute other playing videos first
        document.querySelectorAll('.story-video').forEach(function (other) {
          if (other !== video) {
            other.pause();
            other.muted = true;
            const otherCard = other.closest('.story-card');
            if (otherCard) {
              otherCard.classList.remove('is-playing');
              const oStatus = otherCard.querySelector('.sound-toggle-status');
              const oHint = otherCard.querySelector('.story-sound-hint');
              if (oStatus) oStatus.textContent = 'Audio On Click';
              if (oHint) oHint.textContent = '▶ Click to play with sound';
            }
          }
        });

        // Auto-unmute and play with sound
        video.muted = false;
        video.play().then(function () {
          card.classList.add('is-playing');
          if (soundStatus) soundStatus.textContent = '🔊 Audio Playing';
          if (soundHint) soundHint.textContent = '❚❚ Click to pause';
        }).catch(function (err) {
          // If browser policy blocks unmuted autoplay, play muted first
          console.warn('Audio play restricted, trying muted:', err);
          video.muted = true;
          video.play();
          card.classList.add('is-playing');
        });
      } else {
        // Pause video & mute
        video.pause();
        video.muted = true;
        card.classList.remove('is-playing');
        if (soundStatus) soundStatus.textContent = 'Audio On Click';
        if (soundHint) soundHint.textContent = '▶ Click to play with sound';
      }
    });

    video.addEventListener('ended', function () {
      video.muted = true;
      card.classList.remove('is-playing');
      if (soundStatus) soundStatus.textContent = 'Audio On Click';
      if (soundHint) soundHint.textContent = '▶ Click to play with sound';
    });
  });
});
