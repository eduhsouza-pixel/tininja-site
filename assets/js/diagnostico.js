(function () {
  function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    }
    return fallbackCopy(text);
  }

  function fallbackCopy(text) {
    return new Promise((resolve, reject) => {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        if (ok) resolve();
        else reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      }
    });
  }

  function initDiagnostico() {
    const root = document.querySelector("[data-diag-console]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
    if (tabs.length === 0 || panels.length === 0) return;

    function activateTab(nextTab, moveFocus) {
      if (!nextTab) return;
      const targetId = nextTab.getAttribute("aria-controls");
      tabs.forEach((tab) => {
        const isCurrent = tab === nextTab;
        tab.setAttribute("aria-selected", isCurrent ? "true" : "false");
        tab.setAttribute("tabindex", isCurrent ? "0" : "-1");
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
      if (moveFocus) {
        nextTab.focus();
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activateTab(tab, false);
      });

      tab.addEventListener("keydown", (event) => {
        let nextIndex = -1;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }
        if (nextIndex >= 0) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });

    root.querySelectorAll("[data-next-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTabId = btn.getAttribute("data-next-tab");
        const targetTab = tabs.find((t) => t.id === targetTabId);
        if (targetTab) {
          activateTab(targetTab, true);
        }
      });
    });

    const resetTimers = new WeakMap();
    root.querySelectorAll("[data-copy-cmd]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const cmd = btn.getAttribute("data-copy-cmd") || "";
        const panel = btn.closest('[role="tabpanel"]');
        const status = panel ? panel.querySelector("[data-copy-status]") : null;
        const prevTimer = resetTimers.get(btn);
        if (prevTimer) clearTimeout(prevTimer);

        try {
          await copyText(cmd);
          btn.textContent = "Comando copiado";
          btn.classList.add("copiado");
          if (status) status.textContent = `Copiado: ${cmd}`;
        } catch {
          if (status) status.textContent = `Use Ctrl+C para copiar: ${cmd}`;
        }

        const timer = setTimeout(() => {
          btn.textContent = "Copiar comando";
          btn.classList.remove("copiado");
          if (status) status.textContent = "";
        }, 3000);
        resetTimers.set(btn, timer);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDiagnostico);
  } else {
    initDiagnostico();
  }
})();
