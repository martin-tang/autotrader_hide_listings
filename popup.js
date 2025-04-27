// Update status display with current settings
const updateStatus = () => {
    chrome.storage.sync.get(
        { ath_setting_hide_highlight: "hide" },  // Changed default to "hide"
        (items) => {
            const statusElement = document.querySelector('.status');
            const mode = items.ath_setting_hide_highlight === 'highlight' ? 
                'Highlighting sponsored content' : 
                'Hiding sponsored content';
            statusElement.textContent = `Active - ${mode}`;
        }
    );
};

// Handle options button click
document.querySelector('#go-to-options').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
});

// Listen for storage changes to update status in real-time
chrome.storage.onChanged.addListener((changes) => {
    if (changes.ath_setting_hide_highlight) {
        updateStatus();
    }
});