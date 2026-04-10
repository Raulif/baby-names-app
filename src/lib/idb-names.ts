const DB_NAME = 'baby-names-config';
const STORE_NAME = 'names-config';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> =>
	new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			request.result.createObjectStore(STORE_NAME);
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});

export const persistNamesToIndexedDB = async (myName: string, partnerName: string): Promise<void> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		store.put(myName, 'myName');
		store.put(partnerName, 'partnerName');
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
};

export const getMyNameFromIndexedDB = async (): Promise<string | null> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readonly');
		const request = tx.objectStore(STORE_NAME).get('myName');
		request.onsuccess = () => resolve(request.result ?? null);
		request.onerror = () => reject(request.error);
	});
};
