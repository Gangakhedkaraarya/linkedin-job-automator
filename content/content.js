let jobData = [];

async function scanJobPosting() {
  const jobTitle = document.querySelector('.job-title').textContent;
  const jobDescription = document.querySelector('.job-description').textContent;
  
  const worker = await Tesseract.createWorker();
  const jobDetails = await worker.recognize(jobDescription);
  
  jobData.push({
    title: jobTitle,
    description: jobDetails.data.text,
    appliedDate: new Date().toISOString()
  });
  
  chrome.storage.local.set({ jobData });
}

document.addEventListener('click', async (e) => {
  if (e.target.matches('.apply-button')) {
    await scanJobPosting();
  }
});
