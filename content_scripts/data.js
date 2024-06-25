let extensionStoragePrefix = "leetmate_";

function saveData(key, value) {
    localStorage.setItem(extensionStoragePrefix + key, value);
}

function loadData(key) {
    return localStorage.getItem(extensionStoragePrefix + key);
}

