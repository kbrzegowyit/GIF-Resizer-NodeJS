export type Config = {
    inputPath: string;
    outputPath: string;
    scaleFactor: number;
}

export default function (args: string[]): Config {
    if (args.length < 5) {
        throw new Error('Not enough arguments');
    }

    const inputPath = args[2];
    const outputPath = args[3];
    const scaleFactor = Number(args[4]);

    if (isNaN(scaleFactor)) {
        throw new Error('Scale factor must be a number');
    }

    return { inputPath, outputPath, scaleFactor };
}