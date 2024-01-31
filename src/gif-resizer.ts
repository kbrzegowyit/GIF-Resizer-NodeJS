import { Gif, GifFrame, GifUtil } from 'gifwrap';
import Jimp from 'jimp';

// gif -> frames -> resize -> gif

export interface OutputGifConfig {
    inputPath: string;
    outputPath: string;
    scaleFactor: number;
}

export default async function(config: OutputGifConfig) {
    const gif = await readGif(config.inputPath);

    if (!gif.frames.length) {
        throw new Error('GIF has no frames');
    }

    process.stdout.write(`Resizing ${gif.frames.length} frames...`);
    gif.frames = await Promise.all(gif.frames.map(async (frame) => resizeFrame(frame, config.scaleFactor)));

    await writeGif(config.outputPath, gif);
}

async function readGif(inputPath: string): Promise<Gif> {
    try {
        const gif = await GifUtil.read(inputPath);
        return gif;
    } catch (error) {
        throw new Error('Could not read input GIF');
    }
}

async function writeGif(outputPath: string, gif: Gif) {
    try {
        await GifUtil.write(outputPath, gif.frames, gif);
    } catch (error) {
        throw new Error('Could not write output GIF');
    }
}

async function resizeFrame(frame: GifFrame, scaleFactor: number): Promise<GifFrame> {
    return new Promise((resolve, reject) => {
        try {
            // Convert the frame to a Jimp image so we can use the Jimp API on it.
            const jimpImage = GifUtil.copyAsJimp(Jimp, frame);
            
            // Resize the image to half its original size.
            jimpImage.scale(scaleFactor);

            // Convert the Jimp image back to a GifFrame
            const newFrame = new GifFrame(jimpImage.bitmap);
            GifUtil.quantizeDekker(newFrame, 256);

            // Put the new frame in the same position as the old frame.
            newFrame.disposalMethod = frame.disposalMethod;
            newFrame.delayCentisecs = frame.delayCentisecs;
            resolve(newFrame);
        } catch (error) {
            reject(new Error('Something went wrong resizing a frame'));
        }
    })
}
