function showAthkar() {
  // Increment the notification count
  chrome.storage.local.get('notificationCount', function(result) {
      const notificationCount = result.notificationCount || 0;
      chrome.storage.local.set({ notificationCount: notificationCount + 1 });
  });

  const athkarList = [
      'الله أكبر',
      'سبحان الله وبحمده',
      'لا إله إلا الله محمد رسول الله',
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ',
      'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ . ',
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً وَرِزْقاً طَيِّباً وَعَمَلاً مُتَقَبَّلاً.',
      'لَّآ إِلَٰهَ إِلَّآ أَنتَ سُبۡحَٰنَكَ إِنِّي كُنتُ مِنَ ٱلظَّٰلِمِينَ.',
      'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ.',
      'رَبَّنَآ ءَاتِنَا فِي ٱلدُّنۡيَا حَسَنَةٗ وَفِي ٱلۡأٓخِرَةِ حَسَنَةٗ وَقِنَا عَذَابَ ٱلنَّارِ.',
      'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.',
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ ',
      'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ ',
      'اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي، وَارْزُقْنِي',
      'اللهم صل وسلم على نبينا مُحمد',
      // Add more athkar as needed
  ];

  const randomIndex = Math.floor(Math.random() * athkarList.length);
  const athkar = athkarList[randomIndex];

  const notificationOptions = {
      type: 'basic',
      iconUrl: '48.png',
      title: 'تذكير بالأذكار',
      message: athkar
  };

  chrome.notifications.create(notificationOptions, function() {
      // Play notification sound
      const audio = new Audio('notification.wav'); 
      audio.play();
  });
}



  // Set alarm on startup
  chrome.storage.sync.get(['interval', 'reminderEnabled'], function(result) {
      const interval = result.interval || 5; // Default interval: 5 minutes
      const reminderEnabled = result.reminderEnabled || false;

      chrome.alarms.create({ periodInMinutes: interval });

      if (reminderEnabled) {
          chrome.alarms.onAlarm.addListener(showAthkar);
      }
  });

chrome.storage.sync.get('reminderEnabled', function(result) {
  const reminderEnabled = result.reminderEnabled || false;

  if (reminderEnabled) {
      chrome.alarms.onAlarm.addListener(showAthkar);
  }
});

chrome.storage.onChanged.addListener(function(changes) {
  if (changes.reminderEnabled) {
      const isReminderEnabled = changes.reminderEnabled.newValue;

      if (isReminderEnabled) {
          chrome.alarms.onAlarm.addListener(showAthkar);
      } else {
          chrome.alarms.onAlarm.removeListener(showAthkar);
      }
  }
});
