import {Center} from './Center';

export type AppStackParamList = {
    Center: undefined;
    Classroom: {
        center: Center;
        index: number;
    };
};
