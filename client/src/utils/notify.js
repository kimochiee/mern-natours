import { toast } from 'react-toastify'

export const notify = (msg, type) => {
  if (type === 'error') {
    toast.error(msg)
  } else if (type === 'success') {
    toast.success(msg, {
      backgroundColor: '#55c57a',
      color: '#55c57a'
    })
  }
}
