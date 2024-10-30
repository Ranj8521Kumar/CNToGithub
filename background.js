chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'pushToGitHub') {
      pushToGitHub(request.problemData);
    }
  });
  
  function pushToGitHub(problemData) {
    // Implement GitHub API calls to push the problem data
    // Use fetch or XMLHttpRequest to interact with GitHub API
  }


  async function pushToGitHub(problemData) {
    const token = await getToken();
    const repo = 'your-repo-name';
    const path = `problems/${problemData.title}.md`;
    const content = btoa(`# ${problemData.title}\n\n${problemData.description}\n\n\`\`\`javascript\n${problemData.code}\n\`\`\``);
  
    fetch(`https://api.github.com/repos/YOUR_USERNAME/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add problem ${problemData.title}`,
        content: content
      })
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  
  function getToken() {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(token);
        }
      });
    });
  }