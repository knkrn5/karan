// const localStorageItems = ['session', 'currentTheme']

function clearBrowserStorage(exceptions: string[] = ['session', 'currentTheme', 'accessPass']): void {
  const savedItems: Record<string, string | null> = {};

  exceptions.forEach(key => {
    savedItems[key] = localStorage.getItem(key);
  });


  // Clearing all localStorage
  localStorage.clear();

  // Restoring the saved keys
  Object.entries(savedItems).forEach(([key, value]) => {
    if (value !== null) {
      localStorage.setItem(key, value);
    }
  });
}

export default clearBrowserStorage;
