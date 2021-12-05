import {Child} from './Child';

export interface Classroom {
    children: Array<Child> | null;
    id: string;
    name: string;
}
