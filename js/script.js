// Anggun Febby Landing Page Core Scripts
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS smoothly if present
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 40,
      disable: window.innerWidth < 768 ? 'mobile' : false
    });
  }

  // Story Cards Video Player Logic
  var cards = document.querySelectorAll('.story-card');

  cards.forEach(function (card) {
    var video = card.querySelector('.story-video');
    var playIcon = card.querySelector('.play-icon');
    var pauseIcon = card.querySelector('.pause-icon');
    var soundToggle = card.querySelector('.sound-toggle');
    var iconMute = card.querySelector('.icon-mute');
    var iconUnmute = card.querySelector('.icon-unmute');

    if (!video) return;

    // Default muted so autoplay/play works without browser block
    video.muted = true;

    function setPlayUI(playing) {
      if (playing) {
        card.classList.add('is-playing');
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
      } else {
        card.classList.remove('is-playing');
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
      }
    }

    card.addEventListener('click', function (e) {
      if (e.target.closest('.ig-badge') || e.target.closest('.sound-toggle')) {
        return;
      }

      if (video.paused) {
        document.querySelectorAll('.story-video').forEach(function (otherVideo) {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
            var otherCard = otherVideo.closest('.story-card');
            if (otherCard) {
              otherCard.classList.remove('is-playing');
              var pI = otherCard.querySelector('.play-icon');
              var paI = otherCard.querySelector('.pause-icon');
              if (pI) pI.style.display = 'block';
              if (paI) paI.style.display = 'none';
            }
          }
        });

        video.play().then(function () {
          setPlayUI(true);
        }).catch(function (err) {
          console.warn('Video play prevented:', err);
        });
      } else {
        video.pause();
        setPlayUI(false);
      }
    });

    if (soundToggle) {
      soundToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          if (iconMute) iconMute.style.display = 'block';
          if (iconUnmute) iconUnmute.style.display = 'none';
        } else {
          if (iconMute) iconMute.style.display = 'none';
          if (iconUnmute) iconUnmute.style.display = 'block';
        }
      });
    }

    video.addEventListener('play', function () { setPlayUI(true); });
    video.addEventListener('pause', function () { setPlayUI(false); });
    video.addEventListener('ended', function () { setPlayUI(false); });
  });
});
