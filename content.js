// Extract problem data from Coding Ninjas page
const problemData = {
    title: document.querySelector('.problem-title').innerText,
    description: document.querySelector('.problem-description').innerText,
    code: document.querySelector('.code-editor').innerText
  };
  
  // Send problem data to background script
  chrome.runtime.sendMessage({ action: 'pushToGitHub', problemData });