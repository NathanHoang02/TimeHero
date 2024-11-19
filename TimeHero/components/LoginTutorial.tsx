import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState, ReactNode } from "react";

const checkFirstLogin = async () => {
    const isFirstLogin = await AsyncStorage.getItem('isFirstTime');

    if (isFirstLogin === null) {
        await AsyncStorage.setItem('isFirstTime', 'false');
        return true;
    }
    return false;
};

type TutorialContextType = {
    tutorialStatus: boolean;
    currentStep: string;
    stepToolTip: string;
    toolTipPopup: () => void;
    startTutorial: () => void;
    endTutorial: () => void;
    completeStep: (step: string) => void;
};

const TutorialContext = createContext<TutorialContextType>({
    tutorialStatus: false,
    currentStep: '',
    stepToolTip: '',
    toolTipPopup: () => {},
    startTutorial: () => {},
    endTutorial: () => {},
    completeStep: () => {},
});

export const useTutorial = () => useContext(TutorialContext);

type TutorialProviderProps = {
    children: ReactNode;
};

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
    const [tutorialStatus, setTutorialStatus] = useState(false);
    const [currentStep, setCurrentStep] = useState('taskSetup');
    const [stepToolTip, setStepToolTip] = useState<string>('Set up your first task');

    useEffect(() => {
        const loadTutorialState = async () => {
            const storedStatus = await AsyncStorage.getItem('tutorialStatus');
            const storedStep = await AsyncStorage.getItem('currentStep');

            if (storedStatus === 'true') {
                setTutorialStatus(true);
                setCurrentStep(storedStep || 'taskSetup');
            }
        };

        loadTutorialState();
    }, []);

    const toolTipPopup = async () => {
        switch (currentStep) {
            case 'taskSetup':
                break;
            case 'timeSetup':
                setStepToolTip('Check your accumulated time here');
                break;
            case 'leaderboardSetup':
                setStepToolTip('Create or Join a group to see your leaderboard');
                break;
            case 'settingsSetup':
                setStepToolTip('Change settings to your leisure');
                break;
            default:
                break;
        }
    }

    const startTutorial = async () => {
        setTutorialStatus(true);
        setCurrentStep('taskSetup');
        await AsyncStorage.setItem('tutorialStatus', 'true');
        await AsyncStorage.setItem('currentStep', 'taskSetup');
    };

    const endTutorial = async () => {
        setTutorialStatus(false);
        setCurrentStep('');
        await AsyncStorage.setItem('tutorialStatus', 'false');
        await AsyncStorage.removeItem('currentStep');
    };

    const completeStep = async (step: string) => {
        if (step === 'taskSetup' && tutorialStatus) {
            setCurrentStep('timeSetup');
            await AsyncStorage.setItem('currentStep', 'timeSetup');
        }
        else if (step === 'timeSetup' && tutorialStatus) {
            setCurrentStep('leaderboardSetup');
            await AsyncStorage.setItem('currentStep', 'leaderboardSetup');
        }
        else if (step === 'leaderboardSetup' && tutorialStatus) {
            setCurrentStep('settingsSetup');
            await AsyncStorage.setItem('currentStep', 'settingsSetup');
        }
        else if (step === 'settingsSetup' && tutorialStatus) {
            await endTutorial();
        }
    };

    return (
        <TutorialContext.Provider value = {{ tutorialStatus, currentStep, stepToolTip, toolTipPopup, startTutorial, endTutorial, completeStep}}>
            {children} 
        </TutorialContext.Provider>
    );
};