import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};
    

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );

    // initial boundaries used for random number generation
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = direction => {
        // should get lower or greater
        // need to validate the 'direction' Eg. if your number is smaller than guess and  you say your number is greater (need to validate)
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You must have pushed the wrong button!', [
                {text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }
        // if the button the user clicks is correct, we want to generate another RANDOM NUMBER
        if (direction === 'lower') {
            // setting high number to current guess, therefor num will be generated below that 'high' num
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        // setting low to current guess, setting high to current guess & excluding current guess
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                {/* onPress={nextGUessHandler} --> points at the function to happen once button is pressed */}
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
           {/* 'greater' and 'lower' strings acts as identifiers that will be passed to the next guess handler*/}
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }

});

export default GameScreen;