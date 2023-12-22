
export type ToastType = 'Success' | 'Warning' | 'Error';

export type ToastData = {
    type: ToastType;
    description: string;
    color: string;
};