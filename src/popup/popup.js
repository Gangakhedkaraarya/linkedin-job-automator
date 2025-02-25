document.getElementById('filterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const filters = {
    keywords: document.getElementById('Category').value,
    location: document.getElementById('location').value,
    jobType: document.getElementById('jobType').value,
    experience: document.getElementById('experience').value
  };

  chrome.storage.local.set({ filters }, () => {
    chrome.runtime.sendMessage({ action: 'START_AUTOMATION', filters });
  });
});
