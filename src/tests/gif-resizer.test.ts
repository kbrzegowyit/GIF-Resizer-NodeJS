import { GifFrame, GifUtil } from 'gifwrap';
import GifResizer from '../gif-resizer.js';
import assert from 'node:assert/strict';

describe('GifResizer', () => {
    it('should resize the gif', async () => {
        const config = {
            inputPath: './assets/funny-celebrate.gif',
            outputPath: 'output.gif',
            scaleFactor: 0.5
        };
        const gif = await GifUtil.read(config.inputPath);

        await GifResizer(config);

        const scaledGif = await GifUtil.read(config.outputPath);
        assert.strictEqual(scaledGif.height, gif.height * config.scaleFactor);
        assert.strictEqual(scaledGif.width, gif.width * config.scaleFactor);
    });

    it('should throw when there is no gif file', async () => {
        const config = {
            inputPath: 'input.gif',
            outputPath: 'output.gif',
            scaleFactor: 0.5
        };

        await assert.rejects(() => GifResizer(config), {
            name: 'Error',
            message: 'Could not read input GIF'
        });
    });
});