const Tesseract = require('tesseract.js');

async function initiateAutomation(filters) {
  const jobListings = document.querySelectorAll('.job-card-container');
  
  for (const listing of jobListings) {
    const jobDetails = await extractJobDetails(listing);
    if (matchesFilters(jobDetails, filters)) {
      await applyToJob(listing);
    }
  }
}

async function extractJobDetails(listing) {
  const textContent = await Tesseract.recognize(listing);
  return {
    title: listing.querySelector('.job-title').textContent,
    company: listing.querySelector('.company-name').textContent,
    description: textContent.data.text
  };
}

async function applyToJob(listing) {
  const jobData = {
    id: listing.dataset.jobId,
    title: listing.querySelector('.job-title').textContent,
    company: listing.querySelector('.company-name').textContent,
    appliedDate: new Date().toISOString()
  };

  const applications = await chrome.storage.local.get('applications') || [];
  applications.push(jobData);
  await chrome.storage.local.set({ applications });
}
