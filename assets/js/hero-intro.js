(function () {
  function initHeroIntro() {
    const hero = document.getElementById("hero-intro");
    const video = document.getElementById("hero-video");
    const entrarWrap = document.getElementById("hero-entrar-wrap");
    const btnEntrar = document.getElementById("btn-intro-entrar");
    const btnPausar = document.getElementById("btn-intro-pausar");
    const btnPular = document.getElementById("btn-intro-pular");
    const btnRever = document.getElementById("btn-intro-rever");
    if (!hero || !video || !entrarWrap || !btnEntrar || !btnPausar || !btnPular || !btnRever) return;

    const params = new URLSearchParams(window.location.search);
    const forceIntro = params.get("intro") === "1";
    const forceSkip = params.get("intro") === "0";
    const seekParam = params.get("t");
    const hasSeek = seekParam !== null && seekParam !== "" && Number.isFinite(parseFloat(seekParam));
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem("tn_intro_vista") === "1";
    } catch (e) {}

    let wipeStarted = false;
    let finishTimer = null;

    function setPauseLabel(isPaused) {
      const span = btnPausar.querySelector("span");
      const svg = btnPausar.querySelector("svg");
      if (!span || !svg) return;
      if (isPaused) {
        span.textContent = "Continuar";
        svg.innerHTML = '<path d="M8 5l11 7-11 7V5z" fill="currentColor"/>';
      } else {
        span.textContent = "Pausar";
        svg.innerHTML = '<rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/>';
      }
    }

    function markSeen() {
      try {
        window.sessionStorage.setItem("tn_intro_vista", "1");
      } catch (e) {}
    }

    function showFinalState(saveSession) {
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
      try {
        video.pause();
      } catch (e) {}
      hero.classList.remove("intro-tocando", "intro-aguardando", "intro-video-ativo", "intro-wipe", "intro-conteudo-visivel");
      hero.classList.add("intro-concluida");
      entrarWrap.hidden = true;
      btnPausar.hidden = true;
      btnPular.hidden = true;
      btnRever.hidden = false;
      if (saveSession) markSeen();
    }

    function enterWaitingState() {
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
      try {
        video.pause();
      } catch (e) {}
      hero.classList.remove("intro-concluida", "intro-wipe", "intro-conteudo-visivel");
      hero.classList.add("intro-tocando", "intro-video-ativo", "intro-aguardando");
      entrarWrap.hidden = false;
      btnPausar.hidden = true;
      btnPular.hidden = false;
      btnRever.hidden = true;
    }

    function triggerBlueprintTransition() {
      if (wipeStarted) return;
      wipeStarted = true;
      hero.classList.add("intro-wipe");
      finishTimer = setTimeout(() => {
        hero.classList.add("intro-conteudo-visivel");
      }, 620);
    }

    function startIntro(startAt) {
      if (video.error) {
        showFinalState(false);
        return;
      }
      wipeStarted = false;
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
      entrarWrap.hidden = true;
      hero.classList.remove("intro-concluida", "intro-aguardando", "intro-wipe", "intro-conteudo-visivel");
      hero.classList.add("intro-tocando", "intro-video-ativo");
      btnPausar.hidden = false;
      btnPular.hidden = false;
      btnRever.hidden = true;

      if (hasSeek) {
        video.preload = "auto";
      }
      const targetTime = Number.isFinite(startAt) ? Math.max(0, startAt) : 0;
      const applySeekAndRun = () => {
        if (!hero.classList.contains("intro-tocando")) return;
        try {
          video.currentTime = targetTime;
        } catch (e) {}
        if (hasSeek) {
          video.pause();
          setPauseLabel(true);
          if (targetTime >= 11.8) triggerBlueprintTransition();
          return;
        }
        setPauseLabel(false);
        const p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            enterWaitingState();
          });
        }
      };

      if (video.readyState >= (hasSeek ? 2 : 1)) {
        applySeekAndRun();
      } else {
        video.addEventListener(hasSeek ? "loadeddata" : "loadedmetadata", applySeekAndRun, { once: true });
        video.load();
      }
    }

    function handleVideoError() {
      if (!hero.classList.contains("intro-tocando") && !hero.classList.contains("intro-aguardando")) return;
      showFinalState(false);
    }

    video.addEventListener("error", handleVideoError);
    const sources = video.querySelectorAll("source");
    if (sources.length > 0) {
      sources[sources.length - 1].addEventListener("error", handleVideoError);
    }

    video.addEventListener("timeupdate", () => {
      if (!hero.classList.contains("intro-tocando")) return;
      const dur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 15;
      if (video.currentTime >= Math.max(11.5, dur - 3.2)) {
        triggerBlueprintTransition();
      }
    });

    video.addEventListener("ended", () => {
      if (!hero.classList.contains("intro-tocando")) return;
      triggerBlueprintTransition();
      setTimeout(() => showFinalState(true), 850);
    });

    btnEntrar.addEventListener("click", () => {
      entrarWrap.hidden = true;
      hero.classList.remove("intro-aguardando");
      btnPausar.hidden = false;
      setPauseLabel(false);
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          showFinalState(false);
        });
      }
    });

    btnPular.addEventListener("click", () => {
      showFinalState(true);
    });

    btnPausar.addEventListener("click", () => {
      if (video.paused) {
        setPauseLabel(false);
        video.play().catch(() => {});
      } else {
        video.pause();
        setPauseLabel(true);
      }
    });

    btnRever.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("t");
      url.searchParams.delete("intro");
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, "", url.toString());
      }
      startIntro(0);
    });

    if (hasSeek) {
      startIntro(parseFloat(seekParam));
    } else if (forceSkip || (!forceIntro && (reducedMotion || alreadySeen))) {
      showFinalState(false);
    } else {
      startIntro(0);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroIntro);
  } else {
    initHeroIntro();
  }
})();
