// Saves options to chrome.storage

const saveOptions = () => {
  // Get the selected option based on the checked radio button
  const choice = document.querySelector('input[name="option_select_radio"]:checked').value; 
  console.log(choice);
  chrome.storage.sync.set(
    { ath_setting_hide_highlight: choice }, // Store the selected option (choice)
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { ath_setting_hide_highlight: "highlight" }, // Default value is "highlight" if not found
      (items) => {
        // Get the saved option from storage
        const savedOption = items.ath_setting_hide_highlight;
        
        // Set the corresponding radio button to checked
          document.getElementById(savedOption + 'ElementsRadio').checked = true;
      }
    );
  };
  
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
  