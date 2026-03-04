const locale = document.documentElement.lang.startsWith("zh") ? "zh" : "en";

const previewByLocale = {
  en: {
    index: {
      chip: "Workspace",
      title: "Conversation hub with search and filters",
      text: "Scan, classify, and jump to any conversation using local index, folder pivots, and tag filters.",
      points: ["Indexed local lookup", "Folder plus tag pivots", "Fast open actions"]
    },
    prompt: {
      chip: "Prompt Library",
      title: "Template snippets with variable placeholders",
      text: "Save repeatable prompts, group them by tags, fill variables quickly, and insert directly to input.",
      points: ["Template catalog", "Tag-based grouping", "Variable prompt fill"]
    },
    formula: {
      chip: "Formula Desk",
      title: "Capture equations and copy to publishing formats",
      text: "Extract formulas from messages and copy as LaTeX or Word-friendly MathML with source jump support.",
      points: ["Formula collector", "LaTeX and MathML copy", "Back-link to source message"]
    },
    mermaid: {
      chip: "Mermaid Desk",
      title: "Render diagrams and trace origin in one panel",
      text: "Detect Mermaid blocks, render preview, copy code, and navigate back to the exact source message.",
      points: ["Diagram preview", "Source code copy", "Origin tracing"]
    }
  },
  zh: {
    index: {
      chip: "\u4f1a\u8bdd\u5de5\u4f5c\u533a",
      title: "\u4f1a\u8bdd\u4e2d\u5fc3\uff1a\u68c0\u7d22 + \u7b5b\u9009 + \u8df3\u8f6c",
      text: "\u901a\u8fc7\u672c\u5730\u7d22\u5f15\u3001\u6587\u4ef6\u5939\u548c\u6807\u7b7e\u7b5b\u9009\uff0c\u5feb\u901f\u5b9a\u4f4d\u5e76\u6253\u5f00\u76ee\u6807\u4f1a\u8bdd\u3002",
      points: ["\u672c\u5730\u7d22\u5f15\u68c0\u7d22", "\u6587\u4ef6\u5939\u4e0e\u6807\u7b7e\u8054\u52a8", "\u4e00\u952e\u6253\u5f00\u4f1a\u8bdd"]
    },
    prompt: {
      chip: "\u63d0\u793a\u8bcd\u5e93",
      title: "\u6a21\u677f\u7247\u6bb5\u4e0e\u53d8\u91cf\u5360\u4f4d\u652f\u6301",
      text: "\u6c89\u6dc0\u9ad8\u9891 Prompt\uff0c\u6309\u6807\u7b7e\u5206\u7ec4\uff0c\u586b\u5145\u53d8\u91cf\u540e\u53ef\u76f4\u63a5\u63d2\u5165\u8f93\u5165\u6846\u3002",
      points: ["\u6a21\u677f\u7ba1\u7406", "\u6807\u7b7e\u5206\u7ec4", "\u53d8\u91cf\u586b\u5145\u63d2\u5165"]
    },
    formula: {
      chip: "\u516c\u5f0f\u5de5\u4f5c\u53f0",
      title: "\u516c\u5f0f\u63d0\u53d6\u4e0e\u591a\u683c\u5f0f\u590d\u5236",
      text: "\u4ece\u6d88\u606f\u4e2d\u63d0\u53d6\u516c\u5f0f\uff0c\u652f\u6301 LaTeX / MathML \u590d\u5236\uff0c\u5e76\u53ef\u56de\u8df3\u6d88\u606f\u6765\u6e90\u3002",
      points: ["\u516c\u5f0f\u96c6\u4e2d\u63d0\u53d6", "LaTeX / MathML \u590d\u5236", "\u6765\u6e90\u6d88\u606f\u5b9a\u4f4d"]
    },
    mermaid: {
      chip: "Mermaid \u5de5\u4f5c\u53f0",
      title: "\u56fe\u8868\u9884\u89c8\u4e0e\u6765\u6e90\u8ffd\u8e2a",
      text: "\u8bc6\u522b Mermaid \u4ee3\u7801\u5757\uff0c\u63d0\u4f9b\u9884\u89c8\u3001\u6e90\u7801\u590d\u5236\u4e0e\u56de\u8df3\u5b9a\u4f4d\u80fd\u529b\u3002",
      points: ["\u56fe\u8868\u5b9e\u65f6\u9884\u89c8", "\u6e90\u7801\u5feb\u901f\u590d\u5236", "\u6765\u6e90\u6d88\u606f\u8ffd\u8e2a"]
    }
  }
};

const previews = previewByLocale[locale];

const tabs = Array.from(document.querySelectorAll(".preview-tab"));
const previewStage = document.getElementById("previewStage");
const previewChip = document.getElementById("previewChip");
const previewTitle = document.getElementById("previewTitle");
const previewText = document.getElementById("previewText");
const previewPoints = document.getElementById("previewPoints");

let currentIndex = 0;

function applyPreview(key) {
  const data = previews[key];
  if (!data || !previewStage || !previewChip || !previewTitle || !previewText || !previewPoints) {
    return;
  }

  previewStage.dataset.mode = key;
  previewChip.textContent = data.chip;
  previewTitle.textContent = data.title;
  previewText.textContent = data.text;
  previewPoints.innerHTML = data.points.map((point) => `<li>${point}</li>`).join("");
}

function setActiveTab(nextIndex) {
  if (!tabs.length) {
    return;
  }

  currentIndex = (nextIndex + tabs.length) % tabs.length;
  tabs.forEach((tab, index) => {
    tab.classList.toggle("is-active", index === currentIndex);
  });

  const shotKey = tabs[currentIndex].dataset.shot;
  if (shotKey) {
    applyPreview(shotKey);
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    setActiveTab(index);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    setActiveTab(currentIndex + 1);
  }
  if (event.key === "ArrowLeft") {
    setActiveTab(currentIndex - 1);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -44px 0px"
  }
);

document.querySelectorAll(".reveal").forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
  revealObserver.observe(node);
});

setActiveTab(0);
