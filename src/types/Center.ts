import {Classroom} from './Classroom';

export interface Center {
    allClassroomsAccessible: boolean;
    classrooms: Array<Classroom>;
    id: string;
    name: string;
}
