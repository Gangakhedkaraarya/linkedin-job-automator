chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'START_AUTOMATION') {
    startJobSearch(request.filters);
  }
});

async function startJobSearch(filters) {
  const searchUrl = constructLinkedInSearchURL(filters);
  const tab = await chrome.tabs.create({ url: searchUrl });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: initiateAutomation,
    args: [filters]
  });
}

function constructLinkedInSearchURL(filters) {
  const baseUrl = 'https://www.linkedin.com/jobs/search/?';
  const params = new URLSearchParams({
    keywords: filters.keywords,
    location: filters.location
  });
  return baseUrl + params.toString();
}
