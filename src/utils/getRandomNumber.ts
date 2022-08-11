
export default function getRandomNumber(): number {
    const min = 1601;
    const max = 2130;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}