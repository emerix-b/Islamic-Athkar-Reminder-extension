document.addEventListener('DOMContentLoaded', function() {
    const intervalSlider = document.getElementById('interval');
    const intervalValue = document.getElementById('intervalValue');
    const toggleButton = document.getElementById('toggleButton');
  
    // Display initial slider value
    intervalValue.textContent = intervalSlider.value;
  
    // Update slider value display as the user slides
    intervalSlider.addEventListener('input', function() {
      const selectedInterval = parseInt(intervalSlider.value);
      intervalValue.textContent = selectedInterval;
      chrome.storage.sync.set({ interval: selectedInterval });
    });
  
    // Set initial interval and reminder state when the extension popup is opened
    chrome.storage.sync.get(['interval', 'reminderEnabled'], function(result) {
      const initialInterval = result.interval || 5; // Default interval: 5 minutes
      const isReminderEnabled = result.reminderEnabled || false;
  
      intervalSlider.value = initialInterval;
      intervalValue.textContent = initialInterval;
      toggleButton.checked = isReminderEnabled;
    });
  
    // Toggle Reminder button change event
    toggleButton.addEventListener('change', function() {
      const isReminderEnabled = toggleButton.checked;
      chrome.storage.sync.set({ reminderEnabled: isReminderEnabled });
  
      if (isReminderEnabled) {
        alert('Reminder is now ON');
      } else {
        alert('Reminder is now OFF');
      }
    });
  });
   

