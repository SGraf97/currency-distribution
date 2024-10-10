import axios from 'axios'

const baseUrl = 'https://api.signaloid.io'
const apiKey = '__YOUR_API_KEY__'
const headers = {
  Authorization: `${apiKey}`,
  ContentType: 'application/json'
}

export function getAxiosClient() {
  const client = axios.create({
    baseURL: baseUrl
  })
  client.defaults.headers['Authorization'] = headers.Authorization
  client.defaults.headers['Content-Type'] = headers.ContentType
  return client
}

export async function submitTaskToExecute(cCode: string): Promise<string> {
  const taskRequest: SourceCodeTaskRequest = {
    Type: 'SourceCode',
    SourceCode: {
      Object: 'SourceCode',
      Code: cCode,
      Arguments: '',
      Language: 'C'
    }
  }
  let taskPostResponse
  try {
    taskPostResponse = await getAxiosClient().post('/tasks', taskRequest)
    if (taskPostResponse.data.TaskID) {
      console.log(`...task successfully created with ID: ${taskPostResponse.data.TaskID}`)
      return taskPostResponse.data.TaskID
    } else {
      return ''
    }
  } catch (error) {
    return ''
    console.log('Error:', error)
  }
}

export async function getTaskPlotImage(taskId: string): Promise<string> {
  console.log('Waiting for the task to finish...')
  return await fetchTaskStatus(taskId)
}
// Helper functions for fetching task status with backoff
async function fetchTaskStatus(taskID: string) {
  try {
    // get task data from API
    const response = await getAxiosClient().get(`/tasks/${taskID}`)
    let taskStatus
    if ('Status' in response.data) {
      taskStatus = response.data.Status
      console.log(`...task status : ${taskStatus}`)
    } else {
      throw new Error('Task status not found in response')
    }

    if (['Completed', 'Cancelled', 'Stopped'].includes(taskStatus)) {
      // task is in a terminal state
      console.log(`Task in terminal state : ${taskStatus}. Can fetch task outputs.`)
      return await getTaskPlotImageUrl(taskID)
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

async function getTaskPlotImageUrl(taskID: string) {
  console.log('Fetching task outputs...')
  try {
    const taskOutputsResponse = await getAxiosClient().get(
      `/tasks/${taskID}/outputs?sanitized=false`
    )
    if (taskOutputsResponse.data.Stdout) {
      const outputStream = await axios.get(taskOutputsResponse.data.Stdout, {
        responseType: 'blob',
        method: 'get'
      })
      const data = outputStream.data as Blob
      const blobText = await data.text()
      console.log(blobText)
      const imageUrl = await plotUxString(blobText)
      return imageUrl
    }
    throw Error('Response does not have stdout')
  } catch (error) {
    console.log('Error:', error)
  }
}

export async function plotUxString(uxString: string) {
  const axiosClient = getAxiosClient()
  const response = await axiosClient.post('/plot', { payload: uxString })
  console.log(response)
  return response.data.presignedURL
}
