export interface Notification {
    title: string;
    body: string;
}

export interface MessageNotification {
    collapse_key: string;
    from: string;
    notification: Notification;
    priority: string;
}
