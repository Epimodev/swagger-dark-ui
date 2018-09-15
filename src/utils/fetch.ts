export function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.response);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    };

    xhr.onerror = () => {
      try {
        const response = JSON.parse(xhr.response);
        reject(response);
      } catch (e) {
        reject(xhr.response);
      }
    };

    xhr.open('GET', url);
    xhr.send();
  });
}
