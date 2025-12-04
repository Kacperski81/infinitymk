export type ServiceData = {
    id: string
    name: string
    image: string;
    services: Array<{
        name: string
        description: string
        icon: string
    }>
}