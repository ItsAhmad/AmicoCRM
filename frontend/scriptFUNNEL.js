const data = [
  { stage: "Prospects", count: 100 },
  { stage: "Qualified Leads", count: 60 },
  { stage: "Proposals Sent", count: 30 },
  { stage: "Closed Deals", count: 10 }
];

const maxCount = Math.max(...data.map(item => item.count));
const funnelContainer = document.getElementById('funnelContainer');

data.forEach((item, index) => {
  const barWidth = (item.count / maxCount) * 100;
  
  const bar = document.createElement('div');
  bar.className = 'funnel-bar';
  bar.style.width = `${barWidth}%`;
  bar.style.height = '40px';
  bar.style.backgroundColor = `hsl(${240 - index * 60}, 70%, 50%)`;
  bar.style.borderRadius = '5px';

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = `${item.stage}: ${item.count}`;

  bar.textContent = item.stage;
  bar.appendChild(tooltip);

  funnelContainer.appendChild(bar);
});
