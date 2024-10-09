export async function CreateTask(task) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      try {
        resolve({ data: task })
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}

const API = {
  CreateTask
}

export default API