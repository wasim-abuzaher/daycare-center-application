import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import {ClassroomCard} from './ClassroomCard';
import {Classroom} from '../types';

describe('renders ClassroomCard correctly', () => {
    it('should match snapshot', () => {
        const mockClassroom: Classroom = {
            children: [{fullName: 'John Doe', checked_in: false}],
            id: '1',
            name: 'Mock Class',
        };

        const onClassroomClickMock = jest.fn();

        const card = renderer.create(
            <ClassroomCard
                classroom={mockClassroom}
                onClassroomClick={onClassroomClickMock}
                index={4}
            />
        );

        expect(card).toMatchSnapshot();
    });

    it('should call onClassroomClick with correct argument', () => {
        const mockClassroom: Classroom = {
            children: [{fullName: 'John Doe', checked_in: false}],
            id: '1',
            name: 'Mock Class',
        };

        const onClassroomClickMock = jest.fn();

        const {getByText} = render(
            <ClassroomCard
                classroom={mockClassroom}
                index={4}
                onClassroomClick={onClassroomClickMock}
            />
        );

        fireEvent.press(getByText('Mock Class'));
        expect(onClassroomClickMock).toBeCalledWith(4);
    });
});
