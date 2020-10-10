export interface Courses {
    id: string,
    title: string,
    year: string,
    level: string,
    speciality: string,
    tags: [string],
    lectures : [object],
    date: Date
}
