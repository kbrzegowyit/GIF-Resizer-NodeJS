import { GifUtil } from 'gifwrap';
import GifResizer from '../gif-resizer.js';
import assert from 'node:assert/strict';
import { existsSync, unlinkSync } from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('GifResizer', () => {
    describe('when the gif file is valid', () => {
        const inputPath = path.join(__dirname, '../../assets/funny-celebrate.gif');
        const outputPath = path.join(__dirname, '/output.gif');

        console.log(inputPath);
        console.log(outputPath);

        afterEach(() => {
            if (existsSync(outputPath)) {
                unlinkSync(outputPath);
            }
        });

        it('should resize the gif', async () => {
            const config = {
                inputPath,
                outputPath,
                scaleFactor: 0.5
            };
            const gif = await GifUtil.read(config.inputPath);
    
            await GifResizer(config);
    
            const scaledGif = await GifUtil.read(config.outputPath);
            assert.strictEqual(scaledGif.height, gif.height * config.scaleFactor);
            assert.strictEqual(scaledGif.width, gif.width * config.scaleFactor);
        });
    });
});