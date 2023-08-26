export const calculateScore = (timeTaken: number, textLength: number, answerPercentage: number) => {
    return Math.ceil(answerPercentage * textLength / timeTaken);
}