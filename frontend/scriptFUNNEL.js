const data = [
  { stage: "Prospects", count: 100 },
  { stage: "Qualified Leads", count: 60 },
  { stage: "Proposals Sent", count: 30 },
  { stage: "5 Yard Line", count: 20 }
];

const maxCount = Math.max(...data.map(item => item.count));
const funnelContainer = document.getElementById('funnelContainer');

data.forEach((item, index) => {
  const barWidth = (item.count / maxCount) * 100;
  
  const bar = document.createElement('div');
  bar.className = 'funnel-rectangle';
  bar.style.height = '20px';
  bar.style.width = `${barWidth}%`;
  /* bar.style.backgroundColor = `hsl(${240 - index * 60}, 70%, 50%)`; */
  bar.style.borderRadius = '5px';

  const text = document.createElement('span');
  text.className = 'funnel-text';
  text.textContent = item.stage;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = `${item.stage}: ${item.count}`;


  bar.appendChild(text);
  bar.appendChild(tooltip);

  funnelContainer.appendChild(bar);
});
