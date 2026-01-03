window.MathJax = {
  tex: {
    tags: "ams",
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  options: {
    renderActions: {
      addCss: [
        200,
        function (doc) {
          const style = document.createElement("style");
          style.innerHTML = `
          .mjx-container { color: inherit; }

          mjx-container[jax="CHTML"][display="true"] {
            overflow-x: hidden !important;
            overflow-y: hidden !important;
          }
          `;
          document.head.appendChild(style);
        },
        "",
      ],
    },
  },
};
