import React from 'react';
import { Text, Button } from 'react-native'
import { fireEvent, render, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {expect } from '@jest/globals';
import { TutorialProvider, useTutorial } from "../LoginTutorial";

let mockStorage: { [key: string]: string | null } = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn((key, value) => {
        mockStorage[key] = value;
        return Promise.resolve();
    }),
    getItem: jest.fn((key) => {
        return Promise.resolve(mockStorage[key] || null);
    }),
    removeItem: jest.fn((key) => {
        delete mockStorage[key];
        return Promise.resolve();
    }),
    clear: jest.fn(() => {
        mockStorage = {};
        return Promise.resolve();
    }),
  }));
  

const TestComponent: React.FC = () => {
    const { tutorialStatus, endTutorial } = useTutorial();

    return (
        <>
            <Text testID="tutorial-status">{tutorialStatus ? 'true' : 'false'}</Text>
            <Button title="End Tutorial" onPress={endTutorial} />
        </>
    )
}

describe('TutorialProvider', () => {
    beforeEach( async () => {
        mockStorage = {};
        jest.clearAllMocks();
    })

    it('tutorial if first login', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    
        const { findByTestId } = render(
            <TutorialProvider>
                <TestComponent />
            </TutorialProvider>
        );
    
        const tutorialStatus = await findByTestId('tutorial-status');
        expect(tutorialStatus.props.children).toBe('true');
        
        const storedValue = await AsyncStorage.getItem('isFirstTime');
        expect(storedValue).toBe('false');
    });
    
    it('no tutorial if not first login', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('false');
    
        const { findByTestId } = render(
            <TutorialProvider>
                <TestComponent />
            </TutorialProvider>
        );
    
        const tutorialStatus = await findByTestId('tutorial-status');
        expect(tutorialStatus.props.children).toBe('false');
    });
    
    it('end tutorial on endTutorial()', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    
        const { getByText, findByTestId } = render(
          <TutorialProvider>
            <TestComponent />
          </TutorialProvider>
        );
    
        const tutorialStatus = await findByTestId('tutorial-status');
        expect(tutorialStatus.props.children).toBe('true');
    
        act(() => {
          fireEvent(getByText('End Tutorial'), 'press');
        });
        
        const updatedStatus = await findByTestId('tutorial-status');
        expect(updatedStatus.props.children).toBe('false');
    });
});