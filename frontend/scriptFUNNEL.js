document.addEventListener("DOMContentLoaded", () => {
    const funnelBars = document.querySelectorAll(".funnel-bar");
    const tooltip = document.getElementById("tooltip");
  
    funnelBars.forEach((bar) => {
      bar.addEventListener("mouseover", (e) => {
        const tooltipText = bar.getAttribute("data-tooltip");
        tooltip.innerText = tooltipText;
        tooltip.style.display = "block";
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.opacity = "1";
      });
  
      bar.addEventListener("mousemove", (e) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
      });
  
      bar.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
        tooltip.style.display = "none";
      });
    });
  });
  