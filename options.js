// Saves options to chrome.storage

const saveOptions = () => {
  const status = document.getElementById('status');
  try {
    const radioButton = document.querySelector('input[name="option_select_radio"]:checked');
    if (!radioButton) {
      throw new Error('Please select an option');
    }
    
    const choice = radioButton.value;
    chrome.storage.sync.set(
      { ath_setting_hide_highlight: choice },
      () => {
        if (chrome.runtime.lastError) {
          showStatus('Error saving settings: ' + chrome.runtime.lastError.message, 'error');
          return;
        }
        showStatus('Settings saved successfully!', 'success');
      }
    );
  } catch (error) {
    showStatus(error.message, 'error');
  }
};

const showStatus = (message, type = 'success') => {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = type;
  
  if (type === 'success') {
    status.style.backgroundColor = '#e8f5e9';
    status.style.color = '#2e7d32';
  } else {
    status.style.backgroundColor = '#ffebee';
    status.style.color = '#c62828';
  }
  
  // Clear the status after 2 seconds for success, or 3 seconds for errors
  setTimeout(() => {
    status.textContent = '';
    status.className = '';
    status.style = '';
  }, type === 'success' ? 2000 : 3000);
};

const restoreOptions = () => {
  chrome.storage.sync.get(
    { ath_setting_hide_highlight: "hide" },  // Changed default from "highlight" to "hide"
    (items) => {
      if (chrome.runtime.lastError) {
        showStatus('Error loading settings: ' + chrome.runtime.lastError.message, 'error');
        return;
      }
      
      try {
        const savedOption = items.ath_setting_hide_highlight;
        const radio = document.getElementById(savedOption + 'ElementsRadio');
        if (radio) {
          radio.checked = true;
        } else {
          console.warn('Invalid saved option:', savedOption);
          document.getElementById('hideElementsRadio').checked = true;  // Changed default radio selection
        }
      } catch (error) {
        console.error('Error restoring options:', error);
        showStatus('Error loading settings. Default options applied.', 'error');
      }
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
