const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise( async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout hit"))
    }, timeoutMs)

    try {
      const res = await fetch(`${API_BASE}/teas/${id}`)
      const data = await res.json()
      resolve(data)
    } catch(err) {
      reject(err)
    } finally {
      console.log("Finally")
      clearTimeout(timeoutId)
    }
     console.log("This will log after the Finally")

    // fetch(`${API_BASE}/teas/${id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     resolve(data)
    //   })
    //   .catch(err => {
    //     reject(err)
    //   })
    //   .finally(() => {
    //       console.log("Finally")
    //       clearTimeout(timeoutId)
    //   })
    //   console.log("This will log before the Finally")
  });
}

// Test with a generous timeout (should work)
fetchTeaWithTimeout(1, 3000)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));