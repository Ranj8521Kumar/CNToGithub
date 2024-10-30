document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('push').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            const problemData = {
              title: document.querySelector('.problem-title').innerText,
              description: document.querySelector('.problem-description').innerText,
              code: document.querySelector('.code-editor').innerText
            };
            chrome.runtime.sendMessage({ action: 'pushToGitHub', problemData });
          }
        });
      });
    });
  });