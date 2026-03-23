const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout hit"))
    }, timeoutMs)

    fetch(`${API_BASE}/teas/${id}`)
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
          console.log("Finally")
          clearTimeout(timeoutId)
      })
  });
}

// Test with a generous timeout (should work)
fetchTeaWithTimeout(1, 180)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));