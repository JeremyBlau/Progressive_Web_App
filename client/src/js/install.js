// Logic for installing the PWA

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default installation prompt
  event.preventDefault();
  // Storing the event to use it later
  deferredPrompt = event;
  // Show your custom installation button or UI element
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  // Check if there is a deferredPrompt
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Clear the deferredPrompt variable as it's a one-time event
    deferredPrompt = null;
  }
});

window.addEventListener('appinstalled', (event) => {
  // Perform actions after successful installation, if needed
  console.log('App installed successfully!');
});
