import { reactive } from 'vue'

export const enum NotificationTypes {
  Actions,
  Warning,
  GreenNotice
}

export interface Notification {
  message: string
  type: NotificationTypes
  time?: number
}

export const notificationSet = reactive(new Set<Notification>())

export async function notify(notification: Notification) {
  notificationSet.add(notification)

  await new Promise(resolve => setTimeout(resolve, notification.time ?? 3000))

  notificationSet.delete(notification)
}
