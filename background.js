chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startAutomation' && request.filters) {
    initiateJobSearch(request.filters);
    sendResponse({ status: "Job search initiated" });
  }
  return true; // Keep service worker alive for async operations
});

async function initiateJobSearch(filters) {
  const searchUrl = constructLinkedInSearchURL(filters);
  if (searchUrl) {
    chrome.tabs.create({ url: searchUrl });
  } else {
    console.error("Invalid search URL.");
  }
}

function constructLinkedInSearchURL(filters) {
  if (!filters.keywords || !filters.location) {
    console.error("Missing required filters.");
    return null;
  }

  const baseUrl = 'https://www.linkedin.com/jobs/search/?';
  const params = new URLSearchParams({
    keywords: filters.keywords,
    location: filters.location,
    f_WT: filters.jobType === 'remote' ? '2' : '',
    f_E: getExperienceLevelParam(filters.experience)
  });

  return baseUrl + params.toString();
}

function getExperienceLevelParam(experience) {
  const experienceMap = {
    "internship": "1",
    "entry": "2",
    "associate": "3",
    "mid-senior": "4",
    "director": "5",
    "executive": "6"
  };
  return experienceMap[experience] || "";
}
